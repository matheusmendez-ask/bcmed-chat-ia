import React, { useMemo, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Dropdown from '~/components/ui/DropdownNoState';
import { useVoicesQuery } from '~/data-provider';
import { useLocalize } from '~/hooks';
import store from '~/store';

const getLocalVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    console.log('voices', voices);

    if (voices.length) {
      resolve(voices);
    } else {
      speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
    }
  });
};

type VoiceOption = {
  value: string;
  display: string;
};

export default function VoiceDropdown() {
  const localize = useLocalize();
  const [voice, setVoice] = useRecoilState(store.voice);
  const [engineTTS] = useRecoilState(store.engineTTS);
  const externalTextToSpeech = engineTTS === 'external';
  const { data: externalVoices = [] } = useVoicesQuery();
  const [localVoices, setLocalVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!externalTextToSpeech) {
      getLocalVoices().then(setLocalVoices);
    }
  }, [externalTextToSpeech]);

  useEffect(() => {
    if (voice) {
      return;
    }

    if (externalTextToSpeech && externalVoices.length) {
      setVoice(externalVoices[0]);
    } else if (!externalTextToSpeech && localVoices.length) {
      setVoice(localVoices[0].name);
    }
  }, [voice, setVoice, externalTextToSpeech, externalVoices, localVoices]);

  const voiceOptions: VoiceOption[] = useMemo(() => {
    if (externalTextToSpeech) {
      return externalVoices.map((v) => ({ value: v, display: v }));
    } else {
      return localVoices.map((v) => ({ value: v.name, display: v.name }));
    }
  }, [externalTextToSpeech, externalVoices, localVoices]);

  return (
    <div className="flex items-center justify-between">
      <div>{localize('com_nav_voice_select')}</div>
      <Dropdown
        value={voice}
        onChange={setVoice}
        options={voiceOptions}
        position="left"
        testId="VoiceDropdown"
      />
    </div>
  );
}
