const config = {
    name: "blud",
    description: "",
    domain:
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://blud.vercel.app", // TODO: change to official domain url
}

export default config
