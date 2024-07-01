import { BackHandler, RefreshControl, ScrollView, View } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";

export function Web() {
    const [navigationState, setNavigationState] = useState<WebViewNavigation>();
    const [refreshEnabled, setRefreshEnabled] = useState(true);
    const webview = useRef<WebView>(null);

    useEffect((): (() => void) => {
        const onAndroidBackPress = (): boolean => {
            if (!navigationState?.canGoBack) return false;
            if (webview.current) {
                webview.current.goBack();
                return true; // prevent default behavior (exit app)
            }
            return false;
        };
        BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
        return (): void => {
            BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
        };
    }, [navigationState]);

    function onRefresh() {
        webview.current?.reload();
    }

    function handleScroll(yOffset: number) {
        if (yOffset === 0) {
            setRefreshEnabled(true);
        } else {
            setRefreshEnabled(false);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#2e2e2e" }}>
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                        enabled={refreshEnabled}
                    />
                }
            >
                <WebView
                    onScroll={(event) => handleScroll(event.nativeEvent.contentOffset.y)}
                    source={{ uri: "https://historyhall.org" }}
                    originWhitelist={["https://historyhall.org"]}
                    ref={webview}
                    style={{ backgroundColor: "#2e2e2e" }}
                    onNavigationStateChange={(navState) => setNavigationState(navState)}
                >
                    <StatusBar translucent={false} backgroundColor="rgb(222, 210, 181)" />
                </WebView>
            </ScrollView>
        </View>
    );
}