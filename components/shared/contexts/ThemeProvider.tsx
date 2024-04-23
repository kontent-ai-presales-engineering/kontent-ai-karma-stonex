import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

type ThemeType = string;

type ThemeContextValue = {
  readonly themeState: ThemeType;
  readonly dispatch: (x: ThemeType) => void;
};

const defaultContext: ThemeContextValue = {
  themeState: 'forex',
  dispatch: () => console.log("Need to be inside of ThemeContext to work!")
};

export const ThemeContext = createContext<ThemeContextValue>(defaultContext);

type ThemeContextProps = {
  children: ReactNode;
  theme: ThemeType;
}

export const ThemeProvider: FC<ThemeContextProps> = ({
                                                       children,
                                                       theme
                                                     }) => {
  const [updatedTheme, setUpdatedTheme] = useState<string>(theme || defaultContext.themeState);

  return (
    <ThemeContext.Provider value={{
      themeState: updatedTheme,
      dispatch: setUpdatedTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};


ThemeProvider.displayName = 'ThemeProvider';
