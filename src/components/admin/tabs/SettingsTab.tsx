import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Save, Shield, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface SettingsTabProps {
  settings: AdminSettings;
  onSettingsChange: (settings: Partial<AdminSettings>) => void;
  onSupportSettingsChange: (settings: Partial<AdminSettings['supportSettings']>) => void;
}

export function SettingsTab({ settings, onSettingsChange, onSupportSettingsChange }: SettingsTabProps) {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings updated successfully",
      description: "Your configuration has been saved.",
      variant: "default",
    });
  };

  const handleError = () => {
    toast({
      title: "Unable to save",
      description: "Please check required fields and try again.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Core Settings */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Settings className="h-4 w-4 text-primary" />
            Core Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="enable-returns" className="text-sm font-medium">
                  Enable Returns
                </Label>
                <p className="text-xs text-muted-foreground">
                  Allow customers to return products
                </p>
              </div>
              <Switch
                id="enable-returns"
                checked={settings.enableReturns}
                onCheckedChange={(checked) => onSettingsChange({ enableReturns: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="enable-exchanges" className="text-sm font-medium">
                  Enable Exchanges
                </Label>
                <p className="text-xs text-muted-foreground">
                  Allow customers to exchange products
                </p>
              </div>
              <Switch
                id="enable-exchanges"
                checked={settings.enableExchanges}
                onCheckedChange={(checked) => onSettingsChange({ enableExchanges: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="enable-cancel" className="text-sm font-medium">
                  Enable Cancel
                </Label>
                <p className="text-xs text-muted-foreground">
                  Allow customers to cancel orders
                </p>
              </div>
              <Switch
                id="enable-cancel"
                checked={settings.enableCancel}
                onCheckedChange={(checked) => onSettingsChange({ enableCancel: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Support Settings */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4 text-primary" />
            Advanced Support Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="return-outside-window" className="text-sm font-medium">
                  Return outside Return Window (RW)
                </Label>
                <p className="text-xs text-muted-foreground">
                  Allow returns beyond the standard return window
                </p>
              </div>
              <Switch
                id="return-outside-window"
                checked={settings.supportSettings.returnOutsideWindow}
                onCheckedChange={(checked) => onSupportSettingsChange({ returnOutsideWindow: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="return-out-of-stock" className="text-sm font-medium">
                  Return out-of-stock items
                </Label>
                <p className="text-xs text-muted-foreground">
                  Allow returns for items currently out of stock
                </p>
              </div>
              <Switch
                id="return-out-of-stock"
                checked={settings.supportSettings.returnOutOfStock}
                onCheckedChange={(checked) => onSupportSettingsChange({ returnOutOfStock: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="auto-archive" className="text-sm font-medium">
                  Auto archive on refund/exchange
                </Label>
                <p className="text-xs text-muted-foreground">
                  Automatically archive processed returns and exchanges
                </p>
              </div>
              <Switch
                id="auto-archive"
                checked={settings.supportSettings.autoArchiveOnRefund}
                onCheckedChange={(checked) => onSupportSettingsChange({ autoArchiveOnRefund: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="auto-receive" className="text-sm font-medium">
                  Auto receive on warehouse scan
                </Label>
                <p className="text-xs text-muted-foreground">
                  Automatically mark items as received when scanned
                </p>
              </div>
              <Switch
                id="auto-receive"
                checked={settings.supportSettings.autoReceiveOnScan}
                onCheckedChange={(checked) => onSupportSettingsChange({ autoReceiveOnScan: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="exchange-out-of-stock" className="text-sm font-medium">
                  Allow exchange of out-of-stock items
                </Label>
                <p className="text-xs text-muted-foreground">
                  Allow exchanges even when replacement items are out of stock
                </p>
              </div>
              <Switch
                id="exchange-out-of-stock"
                checked={settings.supportSettings.allowExchangeOutOfStock}
                onCheckedChange={(checked) => onSupportSettingsChange({ allowExchangeOutOfStock: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={handleError}>
          Test Error
        </Button>
        <Button onClick={handleSave} className="bg-success hover:bg-success/90">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}