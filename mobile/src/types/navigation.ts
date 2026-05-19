export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterProfile: {
    registrationData: {
      name: string;
      email: string;
      password: string;
    };
  };
};

export type MainTabParamList = {
  DashboardTab: undefined;
  SearchTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  EditProfile: undefined;
  AdjustGoals: undefined;
};
