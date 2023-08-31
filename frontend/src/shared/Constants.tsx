export const types = [
    "simple",
    "exec",
    "forking",
    "oneshot",
    "dbus",
    "notify",
    "idle",
];

export const restartOptions = [
    "always",
    "on-success",
    "on-failure",
    "on-abnormal",
    "on-abort",
    "on-watchdog",
];

export const wantedByOptions = [
    "multi-user.target",
    "default.target",
    "network-online.target",
    "sysinit.target",
    "basic.target",
    "graphical.target",
    "shutdown.target",
];