import React, { forwardRef } from 'react';
import WebView from 'react-native-webview';
import assets from '../../helpers/assets';

const ToneWebView = forwardRef((props, ref: any) => {
  return (
    <WebView
      source={assets.toneHtml}
      javaScriptEnabled={true}
      ref={ref}
      originWhitelist={['*']}
      style={{
        flex: 0,
      }}
    />
  );
});

export default ToneWebView;
