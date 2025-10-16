// Consolidated Account Page
// Replaces: UserAccount.tsx and PartnerAccount.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth";

type AccountType = 'rider' | 'partner';

interface AccountConfig {
  title: string;
  description: string;
}

const accountConfigs: Record<AccountType, AccountConfig> = {
  rider: {
    title: 'Rider Account',
    description: 'Welcome to your Caye Cruiser account page. Here you can view your ride history and manage your settings.'
  },
  partner: {
    title: 'Partner Account',
    description: 'Welcome to your Caye Cruiser partner dashboard. Here you can manage your availability, view ride requests, and track your earnings.'
  }
};

interface AccountPageProps {
  type: AccountType;
}

const AccountPage = ({ type }: AccountPageProps) => {
  const { user } = useAuth();
  const config = accountConfigs[type];

  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.user_metadata.avatar_url} />
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{config.title}</CardTitle>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{config.description}</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default AccountPage;
