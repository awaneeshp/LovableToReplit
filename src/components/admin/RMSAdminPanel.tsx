import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings, RotateCcw, ArrowLeftRight, CreditCard, MessageSquare } from 'lucide-react';
import { SettingsTab } from './tabs/SettingsTab';
import { ReturnTab } from './tabs/ReturnTab';
import { ExchangeTab } from './tabs/ExchangeTab';
import { PaymentTab } from './tabs/PaymentTab';
import { ReasonTab } from './tabs/ReasonTab';

interface AdminSettings {
  enableReturns: boolean;
  enableExchanges: boolean;
  enableCancel: boolean;
  supportSettings: {
    returnOutsideWindow: boolean;
    returnOutOfStock: boolean;
    autoArchiveOnRefund: boolean;
    autoReceiveOnScan: boolean;
    allowExchangeOutOfStock: boolean;
  };
}

export function RMSAdminPanel() {
  const [settings, setSettings] = useState<AdminSettings>({
    enableReturns: true,
    enableExchanges: true,
    enableCancel: true,
    supportSettings: {
      returnOutsideWindow: false,
      returnOutOfStock: true,
      autoArchiveOnRefund: true,
      autoReceiveOnScan: false,
      allowExchangeOutOfStock: false,
    },
  });

  const [activeTab, setActiveTab] = useState('settings');

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateSupportSettings = (newSupportSettings: Partial<AdminSettings['supportSettings']>) => {
    setSettings(prev => ({
      ...prev,
      supportSettings: { ...prev.supportSettings, ...newSupportSettings }
    }));
  };

  return (
    <div className="min-h-screen bg-background-subtle">
      {/* Enterprise Header */}
      <div className="bg-card border-b border-border-strong shadow-enterprise-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground">Return Management System</h1>
              <p className="text-muted-foreground">Enterprise Admin Configuration Panel</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="px-3 py-1">
                Demo Mode
              </Badge>
              <Badge variant="outline" className="px-3 py-1 border-accent text-accent">
                Enterprise Edition
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Card className="shadow-enterprise-lg border-card-border">
          <CardHeader className="border-b border-border bg-gradient-subtle">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-primary" />
              Configuration Dashboard
            </CardTitle>
            <CardDescription>
              Configure your return, exchange, and payment processing settings
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-background-muted border-b border-border rounded-none h-14">
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-enterprise-sm"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
                
                <TabsTrigger 
                  value="return" 
                  disabled={!settings.enableReturns}
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-enterprise-sm disabled:opacity-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Return
                  {!settings.enableReturns && (
                    <Badge variant="outline" className="ml-1 text-xs">Disabled</Badge>
                  )}
                </TabsTrigger>
                
                <TabsTrigger 
                  value="exchange" 
                  disabled={!settings.enableExchanges}
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-enterprise-sm disabled:opacity-50"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  Exchange
                  {!settings.enableExchanges && (
                    <Badge variant="outline" className="ml-1 text-xs">Disabled</Badge>
                  )}
                </TabsTrigger>
                
                <TabsTrigger 
                  value="payment" 
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-enterprise-sm"
                >
                  <CreditCard className="h-4 w-4" />
                  Payment
                </TabsTrigger>
                
                <TabsTrigger 
                  value="reason" 
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-enterprise-sm"
                >
                  <MessageSquare className="h-4 w-4" />
                  Reason
                </TabsTrigger>
              </TabsList>

              <div className="bg-card">
                <TabsContent value="settings" className="mt-0 border-0 p-6">
                  <SettingsTab 
                    settings={settings} 
                    onSettingsChange={updateSettings}
                    onSupportSettingsChange={updateSupportSettings}
                  />
                </TabsContent>

                <TabsContent value="return" className="mt-0 border-0 p-6">
                  <ReturnTab settings={settings} />
                </TabsContent>

                <TabsContent value="exchange" className="mt-0 border-0 p-6">
                  <ExchangeTab settings={settings} />
                </TabsContent>

                <TabsContent value="payment" className="mt-0 border-0 p-6">
                  <PaymentTab settings={settings} />
                </TabsContent>

                <TabsContent value="reason" className="mt-0 border-0 p-6">
                  <ReasonTab />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}