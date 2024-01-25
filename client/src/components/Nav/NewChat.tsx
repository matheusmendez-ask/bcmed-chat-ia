import { useLocalize, useConversation, useNewConvo, useOriginNavigate } from '~/hooks';
import { MinimalIcon, Icon } from '~/components/Endpoints';
import {
  Plugin,
  GPTIcon,
  AnthropicIcon,
  AzureMinimalIcon,
  CustomMinimalIcon,
  PaLMIcon,
  CodeyIcon,
  GoogleIconChat,
} from '~/components/svg';
import ChatGPT from '../Input/ModelSelect/ChatGPT';
import BingAI from '../Input/ModelSelect/BingAI';

export default function NewChat({
  endpoint,
  toggleNav,
}: {
  endpoint: string;
  toggleNav: () => void;
}) {
  const { newConversation } = useConversation();
  const { newConversation: newConvo } = useNewConvo();
  const navigate = useOriginNavigate();
  const localize = useLocalize();

  const clickHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button === 0 && !event.ctrlKey) {
      event.preventDefault();
      newConvo();
      newConversation();
      navigate('new');
      toggleNav();
    }
  };

  const Icon = ({ endpoint }) => {
    let IconComponent;

    if (endpoint === 'openAI' || endpoint === 'azureOpenAI') {
      IconComponent = <GPTIcon size={19} className="rounded-full bg-white text-black" />;
    } else if (endpoint === 'anthropic') {
      IconComponent = <AnthropicIcon size={19} className="rounded-full bg-white text-black" />;
    } else if (endpoint === 'chatGPTBrowser') {
      IconComponent = <ChatGPT size={19} className="rounded-full bg-white text-black" />;
    } else if (endpoint === 'bingAI') {
      IconComponent = <BingAI size={19} className="rounded-full bg-white text-black" />;
    } else if (endpoint === 'google') {
      IconComponent = <GoogleIconChat size={19} className="rounded-full bg-white text-black" />;
    } else if (endpoint === 'plugin') {
      IconComponent = <Plugin size={19} className="rounded-full bg-white text-black" />;
    }
    return <div>{IconComponent}</div>;
  };

  return (
    <a
      href="/"
      data-testid="nav-new-chat-button"
      onClick={clickHandler}
      className="flex h-11 w-full items-center justify-between rounded-md px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-900/40"
    >
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 flex-shrink-0">
          <div className="gizmo-shadow-stroke relative flex h-full items-center justify-center rounded-full bg-white text-black">
            <Icon endpoint={endpoint} />
          </div>
        </div>
        <span>{localize('com_ui_new_chat')}</span>
      </div>
      <svg
        width="20" // Adjust width if necessary
        height="20" // Adjust height if necessary
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon-md ml-auto" // This should push the SVG to the right
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon-md"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.7929 2.79289C18.0118 1.57394 19.9882 1.57394 21.2071 2.79289C22.4261 4.01184 22.4261 5.98815 21.2071 7.20711L12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16H9C8.44772 16 8 15.5523 8 15V12C8 11.7348 8.10536 11.4804 8.29289 11.2929L16.7929 2.79289ZM19.7929 4.20711C19.355 3.7692 18.645 3.7692 18.2071 4.2071L10 12.4142V14H11.5858L19.7929 5.79289C20.2308 5.35499 20.2308 4.64501 19.7929 4.20711ZM6 5C5.44772 5 5 5.44771 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34314 4.34315 3 6 3H10C10.5523 3 11 3.44771 11 4C11 4.55228 10.5523 5 10 5H6Z"
            fill="currentColor"
          ></path>
        </svg>
      </svg>
    </a>
  );
}
