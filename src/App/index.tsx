import { useLoader, useModal } from "@providers";
import { Spinner, Modal } from "@components";

import { AppProvider } from "App/providers";
import { Appbar, AppDrawer, Dashboard } from "App/components";

import { RootContainer } from "./styles";

function App() {
    const loader = useLoader();
    const { modalProps } = useModal();

    return (
        <>
            <AppProvider>
                <RootContainer>
                    <Appbar />
                    <AppDrawer />
                    <Dashboard />
                </RootContainer>
            </AppProvider>
            <Spinner
                open={loader.visible}
                onClose={loader.hide}
            />
            <Modal {...modalProps} />
        </>
    );
}

export default App;
