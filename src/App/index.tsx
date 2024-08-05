import { AppProvider } from "App/providers";
import { Appbar, AppDrawer, Dashboard } from "App/components";
import { RootContainer } from "./styles";

function App() {
    return (
        <AppProvider>
            <RootContainer>
                <Appbar />
                <AppDrawer />
                <Dashboard />
            </RootContainer>
        </AppProvider>
    );
}

export default App;
