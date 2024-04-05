import { useMemo } from 'react';
import { ArrowRightToLine } from 'lucide-react';
import type { TConfig } from 'librechat-data-provider';
import type { NavLink } from '~/common';
import PanelSwitch from '~/components/SidePanel/Builder/PanelSwitch';
import FilesPanel from '~/components/SidePanel/Files/Panel';
import { Blocks, AttachmentIcon } from '~/components/svg';

export default function useSideNavLinks({
  hidePanel,
  assistants,
  keyProvided,
}: {
  hidePanel: () => void;
  assistants?: TConfig | null;
  keyProvided: boolean;
}) {
  const Links = useMemo(() => {
    const links: NavLink[] = [];
    if (assistants && assistants.disableBuilder !== true && keyProvided) {
      links.push({
        title: 'com_sidepanel_assistant_builder',
        label: '',
        icon: Blocks,
        id: 'assistants',
        Component: PanelSwitch,
      });
    }

    links.push({
      title: 'com_sidepanel_attach_files',
      label: '',
      icon: AttachmentIcon,
      id: 'files',
      Component: FilesPanel,
    });

    links.push({
      title: 'com_sidepanel_hide_panel',
      label: '',
      icon: ArrowRightToLine,
      onClick: hidePanel,
      id: 'hide-panel',
    });

    return links;
  }, [assistants, keyProvided, hidePanel]);

  return Links;
}
