import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TConversation } from 'librechat-data-provider';

import ExportButton from './ExportButton';
import EditMenuButton from '../Conversations/EditMenuButton';
import ShareButton from '../Conversations/ShareButton';
import HoverToggle from '../Conversations/HoverToggle';
import { useRecoilValue } from 'recoil';
import store from '~/store';
import { Download } from 'lucide-react';

export default function ExportAndShareButton() {
  const location = useLocation();

  const activeConvo = useRecoilValue(store.conversationByIndex(0));
  const globalConvo = useRecoilValue(store.conversation) ?? ({} as TConversation);
  const [isPopoverActive, setIsPopoverActive] = useState(false);
  let conversation: TConversation | null | undefined;
  if (location.state?.from?.pathname.includes('/chat')) {
    conversation = globalConvo;
  } else {
    conversation = activeConvo;
  }

  const exportable =
    conversation &&
    conversation.conversationId &&
    conversation.conversationId !== 'new' &&
    conversation.conversationId !== 'search';

  if (!exportable) {
    return <></>;
  }

  const isActiveConvo = exportable;

  return (
    <HoverToggle
      isActiveConvo={!!isActiveConvo}
      isPopoverActive={isPopoverActive}
      setIsPopoverActive={setIsPopoverActive}
    >
      <EditMenuButton
        icon={<Download />}
        tooltip="Export/Share"
        className="pointer-cursor relative z-50 flex h-[40px] min-w-4 flex-none flex-col items-center justify-center rounded-md border border-gray-100 bg-white px-3 text-left hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 radix-state-open:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:radix-state-open:bg-gray-700 sm:text-sm"
      >
        {conversation && conversation.conversationId && (
          <>
            <ExportButton conversation={conversation} />
            <ShareButton
              conversationId={conversation.conversationId}
              title={conversation.title ?? ''}
              appendLabel={true}
              className="mb-[3.5px]"
              setPopoverActive={setIsPopoverActive}
            />
          </>
        )}
      </EditMenuButton>
    </HoverToggle>
  );
}
