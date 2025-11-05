# Navigation from PostStack to CommunityStack

## Overview
This guide explains how to navigate from the PostStack to the CommunityStack, passing a `communityId` parameter through the nested navigation structure.

## Navigation Hierarchy
```
AppStack
  ├── BottomTabsStack (bottom-tabs-stack)
  │   ├── HomeStack (/home)
  │   │   ├── HomeScreen
  │   │   └── CommunityStackScreen (/community-stack)
  │   │       └── CommunityScreen
  │   ├── ShopStack (/shop)
  │   ├── ChatStack (/chat)
  │   └── MoreStack (/more)
  └── PostStack (/post-stack)
      ├── PostScreen
      └── ReplyScreen (/post-stack/reply)
```

## Solution

### 1. Updated Type Definitions
The `RootStackParamList` in `/src/typescript/types.ts` now supports nested navigation:

```typescript
'/bottom-tabs-stack': undefined | {
  screen?: string;
  params?: {
    screen?: string;
    params?: any;
  };
};

'/post-stack': {
  screen?: string;
  postId: string;
  communityId?: string;  // Optional communityId
};

'/community-stack': {
  screen?: string;
  communityId: string;
};
```

### 2. How to Navigate from PostScreen to CommunityStack

#### Option A: Navigate to a specific community
```typescript
import { useAppNavigation } from 'hooks/useAppNavigation';

const PostScreen = () => {
  const navigation = useAppNavigation();
  const communityId = 'community-123'; // Get this from your post data

  const navigateToCommunity = () => {
    navigation.navigate('/bottom-tabs-stack', {
      screen: '/home',
      params: {
        screen: '/community-stack',
        params: {
          communityId: communityId,
        },
      },
    });
  };

  return (
    // Your component JSX
    <Button onPress={navigateToCommunity}>Go to Community</Button>
  );
};
```

#### Option B: Navigate when opening PostStack with communityId
When navigating TO the PostStack from another screen, pass the communityId:

```typescript
// From CommunityScreen or any other screen
navigation.navigate('/post-stack', {
  postId: 'post-123',
  communityId: 'community-456',  // This will be available in PostStack
});
```

Then the "Go to community" button in the header will automatically use this communityId to navigate back.

### 3. Updated PostStackScreen
The `PostStackScreen` now accepts and passes the `communityId`:

```typescript
const PostStackScreen = ({ route }: { route: any }) => {
  const communityId = route?.params?.communityId;
  
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name={postStackPath}
        component={PostScreen}
        options={{
          headerShown: true,
          header: () => <HeaderBackButton children={<PostTitle title={'Post'} communityId={communityId} />} />,
        }}
        initialParams={{ communityId }}
      />
      {/* ... */}
    </PostStack.Navigator>
  );
};
```

### 4. Updated PostTitle Component
The header button now handles navigation to the community:

```typescript
const PostTitle = ({ title, communityId }: { title: string; communityId?: string }) => {
  const navigation = useAppNavigation();
  
  const handleGoToCommunity = () => {
    if (communityId) {
      // Navigate to specific community with nested navigation
      navigation.navigate('/bottom-tabs-stack', {
        screen: '/home',
        params: {
          screen: '/community-stack',
          params: {
            communityId: communityId,
          },
        },
      });
    } else {
      // Just go to bottom tabs (home)
      navigation.navigate('/bottom-tabs-stack');
    }
  };
  
  return (
    // JSX with button that calls handleGoToCommunity
  );
};
```

## Complete Example: Navigating from PostScreen

Here's a complete example of how to add a button in PostScreen to navigate to a community:

```typescript
import React, { useState } from 'react';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'typescript/types';

type PostScreenRouteProp = RouteProp<RootStackParamList, '/post-stack'>;

const PostScreen = () => {
  const navigation = useAppNavigation();
  const route = useRoute<PostScreenRouteProp>();
  
  // Get communityId from route params or from post data
  const communityId = route.params?.communityId || POST_DATA.communityId;

  const navigateToCommunity = () => {
    if (communityId) {
      navigation.navigate('/bottom-tabs-stack', {
        screen: '/home',
        params: {
          screen: '/community-stack',
          params: {
            communityId: communityId,
          },
        },
      });
    }
  };

  return (
    // Your existing PostScreen JSX
    // Add a button somewhere that calls navigateToCommunity()
  );
};
```

## Key Points

1. **Nested Navigation Parameters**: When navigating through multiple nested navigators, use the `screen` and `params` pattern to drill down to the target screen.

2. **Pass communityId Early**: When navigating TO the PostStack, pass the `communityId` in the initial navigation params so it's available throughout the PostStack navigation.

3. **Optional communityId**: The `communityId` is optional in PostStack params, so the header button can still work even if no communityId is provided (it will just navigate to the home tab).

4. **Type Safety**: The updated `RootStackParamList` ensures TypeScript knows about the nested navigation structure.

## Testing the Navigation

To test this:

1. Navigate to a Post from a Community screen, passing the communityId
2. Click the "Go to community" button in the header
3. You should be taken directly to that specific community screen
