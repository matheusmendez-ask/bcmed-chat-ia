import * as Tabs from '@radix-ui/react-tabs';
import { MessageSquare } from 'lucide-react';
import { SettingsTabValues } from 'librechat-data-provider';
import type { TDialogProps } from '~/common';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { GearIcon, DataIcon, UserIcon, ExperimentIcon } from '~/components/svg';
import { General, Messages, Beta, Data, Account } from './SettingsTabs';
import { useMediaQuery, useLocalize } from '~/hooks';
import { cn } from '~/utils';

export default function Settings({ open, onOpenChange }: TDialogProps) {
  const isSmallScreen = useMediaQuery('(max-width: 767px)');
  const localize = useLocalize();

  return (
    <Transition appear show={open}>
      <Dialog as="div" className="relative z-50 focus:outline-none" onClose={onOpenChange}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 transform-[scale(95%)]"
            enterTo="opacity-100 transform-[scale(100%)]"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 transform-[scale(100%)]"
            leaveTo="opacity-0 transform-[scale(95%)]"
          >
            <DialogPanel
              className={cn(
                'overflow-hidden rounded-xl rounded-b-lg bg-white pb-6 shadow-2xl animate-in dark:bg-gray-700 sm:rounded-lg  md:min-h-[373px] md:w-[680px]',
                isSmallScreen ? 'top-5 -translate-y-0' : '',
              )}
            >
              <DialogTitle className="mb-3 flex items-center justify-between border-b border-black/10 p-6 pb-5 text-left dark:border-white/10">
                <h2 className="text-lg font-medium leading-6 text-gray-800 dark:text-gray-200">
                  {localize('com_nav_settings')}
                </h2>
                <button
                  type="button"
                  className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900 dark:data-[state=open]:bg-gray-800"
                  onClick={() => onOpenChange(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-black dark:text-white"
                  >
                    <line x1="18" x2="6" y1="6" y2="18"></line>
                    <line x1="6" x2="18" y1="6" y2="18"></line>
                  </svg>
                  <span className="sr-only">Close</span>
                </button>
              </DialogTitle>
              <div className="max-h-[373px] overflow-auto px-6 md:min-h-[373px] md:w-[680px]">
                <Tabs.Root
                  defaultValue={SettingsTabValues.GENERAL}
                  className="flex flex-col gap-10 md:flex-row"
                  orientation="horizontal"
                >
                  <Tabs.List
                    aria-label="Settings"
                    role="tablist"
                    aria-orientation="horizontal"
                    className={cn(
                      'min-w-auto max-w-auto -ml-[8px] flex flex-shrink-0 flex-col flex-wrap overflow-auto sm:max-w-none',
                      isSmallScreen ? 'flex-row rounded-lg bg-gray-200 p-1 dark:bg-gray-800' : '',
                    )}
                    style={{ outline: 'none' }}
                  >
                    <Tabs.Trigger
                      className={cn(
                        'group m-1 flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-black radix-state-active:bg-white radix-state-active:text-black dark:text-white dark:radix-state-active:bg-gray-600',
                        isSmallScreen
                          ? 'flex-1 flex-col items-center justify-center text-sm dark:text-gray-500 dark:radix-state-active:text-white'
                          : 'bg-white radix-state-active:bg-gray-200',
                        isSmallScreen ? '' : 'dark:bg-gray-700',
                      )}
                      value={SettingsTabValues.GENERAL}
                      style={{ userSelect: 'none' }}
                    >
                      <GearIcon />
                      {localize('com_nav_setting_general')}
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className={cn(
                        'group m-1 flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-black radix-state-active:bg-white radix-state-active:text-black dark:text-white dark:radix-state-active:bg-gray-600',
                        isSmallScreen
                          ? 'flex-1 flex-col items-center justify-center text-sm dark:text-gray-500 dark:radix-state-active:text-white'
                          : 'bg-white radix-state-active:bg-gray-200',
                        isSmallScreen ? '' : 'dark:bg-gray-700',
                      )}
                      value={SettingsTabValues.MESSAGES}
                      style={{ userSelect: 'none' }}
                    >
                      <MessageSquare className="icon-sm" />
                      {localize('com_endpoint_messages')}
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className={cn(
                        'group m-1 flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-black radix-state-active:bg-white radix-state-active:text-black dark:text-white dark:radix-state-active:bg-gray-600',
                        isSmallScreen
                          ? 'flex-1 flex-col items-center justify-center text-sm dark:text-gray-500 dark:radix-state-active:text-white'
                          : 'bg-white radix-state-active:bg-gray-200',
                        isSmallScreen ? '' : 'dark:bg-gray-700',
                      )}
                      value={SettingsTabValues.BETA}
                      style={{ userSelect: 'none' }}
                    >
                      <ExperimentIcon />
                      {localize('com_nav_setting_beta')}
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className={cn(
                        'group m-1 flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-black radix-state-active:bg-white radix-state-active:text-black dark:text-white dark:radix-state-active:bg-gray-600',
                        isSmallScreen
                          ? 'flex-1 flex-col items-center justify-center text-sm dark:text-gray-500 dark:radix-state-active:text-white'
                          : 'bg-white radix-state-active:bg-gray-200',
                        isSmallScreen ? '' : 'dark:bg-gray-700',
                      )}
                      value={SettingsTabValues.DATA}
                      style={{ userSelect: 'none' }}
                    >
                      <DataIcon />
                      {localize('com_nav_setting_data')}
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className={cn(
                        'group m-1 flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-black radix-state-active:bg-white radix-state-active:text-black dark:text-white dark:radix-state-active:bg-gray-600',
                        isSmallScreen
                          ? 'flex-1 flex-col items-center justify-center text-sm dark:text-gray-500 dark:radix-state-active:text-white'
                          : 'bg-white radix-state-active:bg-gray-200',
                        isSmallScreen ? '' : 'dark:bg-gray-700',
                      )}
                      value={SettingsTabValues.ACCOUNT}
                      style={{ userSelect: 'none' }}
                    >
                      <UserIcon />
                      {localize('com_nav_setting_account')}
                    </Tabs.Trigger>
                  </Tabs.List>
                  <div className="h-screen max-h-[373px] overflow-auto sm:w-full sm:max-w-none md:pr-0.5 md:pt-0.5">
                    <General />
                    <Messages />
                    <Beta />
                    <Data />
                    <Account />
                  </div>
                </Tabs.Root>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
