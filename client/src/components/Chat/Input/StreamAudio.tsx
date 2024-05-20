import { useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MediaSourceAppender } from '~/hooks/Audio/MediaSourceAppender';
import store from '~/store';

export default function StreamAudio({ index = 0 }) {
  const audioRunId = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSourceRef = useRef<MediaSourceAppender | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const activeRunId = useRecoilValue(store.activeRunFamily(index));
  const isSubmitting = useRecoilValue(store.isSubmittingFamily(index));
  const latestMessage = useRecoilValue(store.latestMessageFamily(index));
  const [audioURL, setAudioURL] = useRecoilState(store.audioURLFamily(index));

  useEffect(() => {
    console.log('StreamAudio effect', { isSubmitting, latestMessage });
    const shouldFetch =
      isSubmitting &&
      latestMessage &&
      (latestMessage.text || latestMessage.content) &&
      !isFetching &&
      activeRunId &&
      activeRunId !== audioRunId.current;

    console.log('shouldFetch', shouldFetch);
    console.log({ isSubmitting, latestMessage, activeRunId, audioRunId: audioRunId.current });
    if (shouldFetch) {
      setIsFetching(true);
      const fetchAudio = async () => {
        try {
          const response = await fetch('/api/files/tts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messageId: latestMessage.messageId }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch audio');
          }

          if (!response.body) {
            throw new Error('Response body is null');
          }

          const reader = response.body.getReader();

          audioSourceRef.current = new MediaSourceAppender('audio/mpeg');
          setAudioURL(audioSourceRef.current.mediaSourceUrl);

          let done = false;
          while (!done) {
            const { value, done: readerDone } = await reader.read();
            if (value) {
              audioSourceRef.current.addData(value);
            }
            done = readerDone;
            if (!done) {
              setIsFetching(false);
            }
          }

          audioRunId.current = activeRunId;

          if (audioRef.current) {
            audioRef.current.onended = () => {
              console.log('Audio ended');
              if (!audioRef.current) {
                return;
              }
              URL.revokeObjectURL(audioRef.current.src);
              setIsFetching(false);
            };
          }

          console.log('Audio fetched successfully');
        } catch (error) {
          console.error('Failed to fetch audio:', error);
        } finally {
          setIsFetching(false);
        }
      };

      fetchAudio();
    }
  }, [isSubmitting, latestMessage, activeRunId, isFetching]);

  return (
    <audio
      ref={audioRef}
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      className="absolute h-0 w-0 overflow-hidden"
      src={audioURL ? audioURL : undefined}
      autoPlay
    />
  );
}
