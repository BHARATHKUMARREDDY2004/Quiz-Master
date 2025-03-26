import { Tabs } from "expo-router";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { icons } from "@/constants";
import { TabIconProps } from "@/types/type";

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="flex items-center justify-center w-24 h-20 mt-9">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-9 h-9"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-md`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#5C636E",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderWidth: 3,
            borderColor: "#5C636E",
            borderRadius: 100,
            height: 70,
            width: "50%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
            position: "absolute",
            overflow: "hidden",
            marginBottom: 10,
            transform: [{ translateX: "50%" }],
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Quizzes",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.quiz}
                color={color}
                name="Quizzes"
                focused={focused}
              />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                activeOpacity={1}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="results"
          options={{
            title: "Results",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.result}
                color={color}
                name="Results"
                focused={focused}
              />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                activeOpacity={1}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;