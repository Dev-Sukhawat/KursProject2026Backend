export const toLocalDisplay = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("sv-SE", {
        timeZone: "Europe/Stockholm",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const toLocalDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("sv-SE", {
        timeZone: "Europe/Stockholm",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};

export const toLocalTime = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString("sv-SE", {
        timeZone: "Europe/Stockholm",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const toUTC = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString();
};

export const toLocalInput = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("sv-SE", {
        timeZone: "Europe/Stockholm",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).replace(" ", "T");
};