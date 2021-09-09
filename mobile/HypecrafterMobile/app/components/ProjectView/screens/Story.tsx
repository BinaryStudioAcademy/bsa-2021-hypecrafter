import React from 'react';
import { View } from "react-native";
import AutoHeightWebView from 'react-native-autoheight-webview';

const StoryView = ({ story }: { story: string }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <AutoHeightWebView
        customStyle={`
          .container {
            padding-right: 20px;
            color: white;
          }
          p {
            font-size: 16px;
          }
        `}
        source={{
          html: `<div class="container">${story}</div>`
        }}
      />
    </View>
  )
}

export default StoryView;