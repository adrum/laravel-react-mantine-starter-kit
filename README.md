# Laravel + React (Mantine) + Inertia + Filament Starter Kit


```
laravel new --using=andrewperoramas/sassykit
cp .env.example .env;
make build;
make up
```


# Handling Authorization

in react I made a hook in to handle dynamic permissions, I made usePermission() in hooks/use-permission.ts,

to use this, you just need usePermission('remove', { teamId, member }), Then in your policy, you should have 
public function remove($team, $member);

and by default, if you don't need dynamic permission, you can simply use 

```
const {
    auth: { can },
} = usePage<SharedData>().props;
```

This will fetch all permissions of the current user


