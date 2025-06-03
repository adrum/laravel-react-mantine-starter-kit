import { Link, router } from '@inertiajs/react';
import { Menu } from '@mantine/core';
import { IconCheck, IconLogout, IconMoneybag, IconSelector, IconSettings } from '@tabler/icons-react';

import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import SidebarMenuButton from './sidebar-menu-button';

export function NavUser({ variant, collapsed = false }: { variant: 'header' | 'sidebar'; collapsed?: boolean }) {
    const { auth, features, module } = usePage<SharedData>().props;

    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
        router.post(route('logout'));
    };

    return (
        <>


            <Menu shadow="md" width={230} position={variant === 'header' ? 'bottom-end' : collapsed ? 'right-end' : 'top-start'}>
                <Menu.Target>
                    <SidebarMenuButton
                        component="button"
                        className={cn('h-12! p-0.5! px-1!', collapsed && 'p-1!')}
                        classNames={{
                            inner: 'items-stretch! justify-between!',
                        }}
                        rightSection={variant == 'sidebar' && !collapsed && <IconSelector color="var(--foreground)" size={20} />}
                    >
                        <UserInfo user={auth.user} showName={variant == 'sidebar' && !collapsed} />
                    </SidebarMenuButton>
                </Menu.Target>

                <Menu.Dropdown className="border-border border-2">
                    <Menu.Label>
                        <UserInfo user={auth.user} showEmail={true} />
                    </Menu.Label>

                    <Menu.Divider />
                    <Menu.Item component={Link} href={route('billings.overview')} leftSection={<IconMoneybag color="gray" size={20} />}>
                        Billing
                    </Menu.Item>

                    <Menu.Item component={Link} href={route('profile.edit')} leftSection={<IconSettings color="gray" size={20} />}>
                        Settings
                    </Menu.Item>

                    {console.log(module)}

                    {module?.has_team && (
                        <>
                            <span className="pl-3 text-muted-foreground text-xs">
                            Teams
</span>
                        <Menu.Item
                        >
                         {module.team?.name}

                        </Menu.Item>
</>
                    )}

                    <Menu.Divider />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                    >
                        <Menu.Item leftSection={<IconLogout color="gray" />} type="submit">
                            Log Out
                        </Menu.Item>
                    </form>
                </Menu.Dropdown>
            </Menu>

            { module.has_team &&
            <Menu shadow="md" width={230} position={variant === 'header' ? 'bottom-end' : collapsed ? 'right-end' : 'top-start'}>
                <Menu.Target>
                    <SidebarMenuButton
                        component="button"
                        className={cn('h-12! p-0.5! px-1! text-xs!', collapsed && 'p-1!')}
                        classNames={{
                            inner: 'items-stretch! justify-between!',
                        }}
                    >
                        Teams
                    </SidebarMenuButton>
                </Menu.Target>

                <Menu.Dropdown className="border-border border-2">

                    <span className="pl-3 text-muted-foreground text-xs">
                        <Link href={route('module.team.index')}>

                    Teams
                        </Link>
                    </span>
                    <Menu.Divider />
                    {console.log(module.team)}


                    {module?.has_team && (
  <>
    {module.team?.teams.length > 0 ? (
      module.team?.teams.map((team) => (
        <Menu.Item key={team.id} component={Link} href={route('module.team.set-current', team.id)} method='patch' >
                                        <span className="flex items-center !space-x-2">

          <span className="truncate">{team.name}</span> { module.team.current_team.id === team.id && <IconCheck size={14} /> }
                                        </span>
        </Menu.Item>
      ))
    ) : (
      <div>Create Team</div>
    )}
  </>
)}




                </Menu.Dropdown>
            </Menu>
}
        </>
    );
}
