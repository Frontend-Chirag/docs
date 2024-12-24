"use client";

import { ClientSideSuspense } from '@liveblocks/react';
import { useInboxNotifications } from '@liveblocks/react/suspense';
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui';
import { BellIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export const Inbox = () => {
    return (
        <ClientSideSuspense fallback={
            <>
                <Button
                    variant={'ghost'}
                    className='relative'
                    disabled
                    size={'icon'}
                >
                    <BellIcon className='size-4' />
                </Button>
                <Separator orientation='vertical' className='h-6' />
            </>
        }>
            <InboxMenu />
        </ClientSideSuspense>
    )
};


const InboxMenu = () => {

    const { inboxNotifications } = useInboxNotifications();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'ghost'}
                        className='relative'
                        size={'icon'}
                    >
                        <BellIcon className='size-4' />
                        {inboxNotifications?.length > 0 && (
                            <span className='absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center'>
                                {inboxNotifications.length}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-auto'>
                    {inboxNotifications.length > 0 ? (
                        <InboxNotificationList>
                            {inboxNotifications.map((inboxnotification) => (
                                <InboxNotification
                                    key={inboxnotification.id}
                                    inboxNotification={inboxnotification}
                                />
                            ))}
                        </InboxNotificationList>
                    ) : (
                        <div className='p-2 w-[400px] text-center text-sm text-muted-foreground'>
                            No notifications
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu >
            <Separator orientation='vertical' className='h-6' />
        </>
    )
}

