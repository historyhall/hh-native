import { ImageBackground, Text, View } from "react-native";
import React from "react";
import splashImage from "../assets/splash.png";

export function InternetError() {
    return (
        <View style={{ backgroundColor: "#2e2e2e" }}>
            <ImageBackground
                source={splashImage}
                style={{ width: "100%", height: "100%", padding: 0, margin: 0 }}
                imageStyle={{ resizeMode: "contain" }}
            >
                <Text
                    style={{
                        flex: 1,
                        textAlign: "center",
                        color: "#F8F6EA",
                        fontSize: 20,
                        textAlignVertical: "bottom",
                        paddingBottom: 100,
                    }}
                >
                    No internet connection detected :(
                </Text>
            </ImageBackground>
        </View>
    );
}