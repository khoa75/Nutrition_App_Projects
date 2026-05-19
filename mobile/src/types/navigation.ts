export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterProfile: {
    registrationData: {
      name: string;
      email: string;
      phone: string;
      password: string;
    };
  };
};

export type MainTabParamList = {
  DashboardTab: undefined;
  SearchTab: undefined;
  MealsTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  EditProfile: undefined;
  AdjustGoals: undefined;
};
