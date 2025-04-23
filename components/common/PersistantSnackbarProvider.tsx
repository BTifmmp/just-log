import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Snackbar } from 'react-native-paper';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

type SnackbarType = {
  id: string;
  content: ReactNode;
  visible: boolean;
  duration?: number;
};

type PersistentSnackbarContextType = {
  registerSnackbar: (id: string, content: ReactNode, duration?: number) => void;
  showSnackbar: (id: string) => void;
  hideSnackbar: (id: string) => void;
  snackbars: SnackbarType[];
};

const PersistentSnackbarContext = createContext<PersistentSnackbarContextType | undefined>(undefined);

type PersistentSnackbarProviderProps = {
  children: ReactNode;
};

export const PersistentSnackbarProvider: React.FC<PersistentSnackbarProviderProps> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarType[]>([]);

  const registerSnackbar = useCallback((id: string, content: ReactNode, duration: number = 3000) => {
    setSnackbars((prevSnackbars) => {
      const updatedSnackbars = prevSnackbars.map((snackbar, index) => {
        // Update if exist
        if (snackbar.id === id) {
          return { ...snackbar, content, duration };
        }
        return snackbar;
      })

      // Add if doesnt exist
      if (prevSnackbars.some(snackbar => snackbar.id === id)) return updatedSnackbars;
      return [...updatedSnackbars, { id, content, visible: false, duration }];
    });
  }, []);

  const showSnackbar = (id: string) => {
    setSnackbars((prevSnackbars) => {
      return prevSnackbars.map(snackbar =>
        snackbar.id === id ? { ...snackbar, visible: true } : snackbar
      );
    });
  };

  const hideSnackbar = (id: string) => {
    setSnackbars((prevSnackbars) => {
      return prevSnackbars.map(snackbar =>
        snackbar.id === id ? { ...snackbar, visible: false } : snackbar
      );
    });
  };

  return (
    <PersistentSnackbarContext.Provider value={{ registerSnackbar, showSnackbar, hideSnackbar, snackbars }}>
      {children}
      {snackbars.map(({ id, content, visible, duration }) => (
        <Snackbar
          key={id}
          visible={visible}
          onDismiss={() => hideSnackbar(id)}
          duration={duration}
          style={{ borderRadius: BorderRadius.largest, paddingVertical: 5, borderWidth: 1, borderColor: Colors.gray[400] }}
          elevation={5}
          theme={{ colors: { inverseSurface: Colors.gray[150], inversePrimary: Colors.gray[950] } }}
          action={{
            label: 'OK',
            onPress: () => hideSnackbar(id),
          }}
        >
          <View style={{ marginRight: 20 }}>{content}</View>
        </Snackbar>
      ))
      }
    </PersistentSnackbarContext.Provider >
  );
};

export const useSnackbar = () => {
  const context = useContext(PersistentSnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within a PersistentSnackbarProvider');
  }

  return context;
};
