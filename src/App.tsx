import "./App.scss";

import selfPic from "@/assets/images/pics/self.png";
import { useMemo } from "react";
import { CommentsSection } from "./components";
import { User } from "./types";
import { UserContext } from "./context";

function App() {
    const user = useMemo<User>(
        () => ({
            channelUrl: "",
            displayName: "jvillegasl2",
            profileImageUrl: selfPic,
            channelId: "1234567890",
        }),
        []
    );

    return (
        <UserContext.Provider value={user}>
            <div className="c-app">
                <CommentsSection />
            </div>
        </UserContext.Provider>
    );
}

export default App;
