import {
  HeaderBackButton as ReactNavigationHeaderBackButton,
  HeaderBackButtonProps,
} from "@react-navigation/elements";

import { useRouter as useNextRouter } from "next/router";
import { StackRouter } from "@react-navigation/routers";
import { StackActions, getPathFromState } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// this is scary...
// but react navigation doesn't expose LinkingContext 😬
import LinkingContext from "@react-navigation/native/lib/module/LinkingContext";
import { LinkingOptions } from "@react-navigation/native";

import { useContext } from "react";

// hack to access getStateForAction from react-navigation's stack
//
const stack = StackRouter({});

export function HeaderBackButton({
  navigation,
  ...props
}: HeaderBackButtonProps & {
  navigation: NativeStackScreenProps<any>["navigation"];
}) {
  const linking = useContext(LinkingContext) as
    | {
        options?: LinkingOptions<ReactNavigation.RootParamList>;
      }
    | undefined;
  const nextRouter = useNextRouter();

  if (!props.canGoBack) {
    return null;
  }
  const back = () => {
    if (nextRouter) {
      const nextState = stack.getStateForAction(
        navigation.getState(),
        StackActions.pop(),
        // @ts-expect-error pop and goBack don't need the dict here, it's okay
        // goBack: https://github.com/react-navigation/react-navigation/blob/main/packages/routers/src/CommonActions.tsx#L49
        // pop: https://github.com/react-navigation/react-navigation/blob/main/packages/routers/src/StackRouter.tsx#L317
        {}
      );
      if (nextState) {
        let path =
          nextState.index != undefined
            ? nextState.routes[nextState.index]?.path
            : undefined;

        if (!path) {
          const getPath =
            linking?.options?.getPathFromState || getPathFromState;
          path = getPath(nextState, linking?.options?.config);
        }

        if (path != undefined) {
          nextRouter.replace(path, undefined, { shallow: true });
        }
      }
    }

    navigation.goBack();
  };

  return <ReactNavigationHeaderBackButton {...props} onPress={back} />;
}
