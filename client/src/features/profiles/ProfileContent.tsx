import { Box, Paper, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";

import ProfilePhoto from "./ProfilePhoto";
import ProfileAbout from "./ProfileAbout";

import ProfileFollowings from "./ProfileFollowings";

export default function ProfileContent() {
  const [value, setValue] = useState(0);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabContents = [
    { label: "About", content: <ProfileAbout />, color: "#ff5722" },
    { label: "Photos", content: <ProfilePhoto />, color: "#ab47bc" },
    { label: "Events", content: <div>Events</div>, color: "#3f51b5" },
    {
      label: "Followers",
      content: <ProfileFollowings activeTab={value} />,
      color: "#2196f3",
    },
    {
      label: "Following",
      content: <ProfileFollowings activeTab={value} />,
      color: "#80deea",
    },
  ];
  return (
    <Box
      component={Paper}
      mt={2}
      p={3}
      elevation={3}
      height={500}
      sx={{ display: "flex", alignItems: "flex-start", borderRadius: 3 }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 0.5, height: 450, minWidth: 200 }}
      >
        {tabContents.map((tab, index) => (
          <Tab
            key={index + 1}
            label={tab.label}
            sx={{ mr: 3, color: tab.color }}
            value={index}
          />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1, p: 3, pt: 0 }}>{tabContents[value].content}</Box>
    </Box>
  );
}
