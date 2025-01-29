const formatDate = (dateStr) => {
    const date = new Date(`${dateStr}T00:00:00-03:00`);
    return date.toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "America/Argentina/Buenos_Aires",
    });
};

export default formatDate;
