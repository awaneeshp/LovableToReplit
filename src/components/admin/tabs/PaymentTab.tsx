import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Clock, DollarSign, Shield, Save, Info } from 'lucide-react';
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

interface PaymentTabProps {
  settings: AdminSettings;
}

export function PaymentTab({ settings }: PaymentTabProps) {
  const { toast } = useToast();
  
  const [paymentModes, setPaymentModes] = useState({
    storeCredit: true,
    bankTransfer: true,
    originalPayment: true,
    others: false
  });

  const [processingTime, setProcessingTime] = useState('3-5 business days');
  const [autoRefundLimit, setAutoRefundLimit] = useState('500');
  const [manualApprovalThreshold, setManualApprovalThreshold] = useState('1000');

  const handleSave = () => {
    toast({
      title: "Payment settings updated",
      description: "Refund processing configurations have been saved successfully.",
      variant: "default",
    });
  };

  const handlePaymentModeChange = (mode: keyof typeof paymentModes, enabled: boolean) => {
    setPaymentModes(prev => ({
      ...prev,
      [mode]: enabled
    }));
  };

  return (
    <div className="space-y-6">
      {/* Inherited Settings Overview */}
      <Card className="border-border shadow-enterprise-sm bg-primary-subtle">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4 text-primary" />
            Inherited from Return & Exchange Tabs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Return Tab Settings</Label>
              <div className="space-y-1">
                <Badge variant={settings.enableReturns ? "default" : "secondary"} className="mr-2">
                  Returns: {settings.enableReturns ? 'Enabled' : 'Disabled'}
                </Badge>
                {settings.enableReturns && (
                  <div className="text-xs text-muted-foreground">
                    • Store Credit, Bank Transfer, Original Payment Mode configured
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Exchange Tab Settings</Label>
              <div className="space-y-1">
                <Badge variant={settings.enableExchanges ? "default" : "secondary"} className="mr-2">
                  Exchanges: {settings.enableExchanges ? 'Enabled' : 'Disabled'}
                </Badge>
                {settings.enableExchanges && (
                  <div className="text-xs text-muted-foreground">
                    • Exchange methods and filters configured
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refund Modes Override */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4 text-primary" />
            Refund Modes Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="enable-store-credit" className="text-sm font-medium">
                  Store Credit
                </Label>
                <p className="text-xs text-muted-foreground">
                  Issue refunds as store credit or gift cards
                </p>
              </div>
              <Switch
                id="enable-store-credit"
                checked={paymentModes.storeCredit}
                onCheckedChange={(checked) => handlePaymentModeChange('storeCredit', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="enable-bank-transfer" className="text-sm font-medium">
                  Bank Transfer
                </Label>
                <p className="text-xs text-muted-foreground">
                  Direct bank account transfers for refunds
                </p>
              </div>
              <Switch
                id="enable-bank-transfer"
                checked={paymentModes.bankTransfer}
                onCheckedChange={(checked) => handlePaymentModeChange('bankTransfer', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="enable-original-payment" className="text-sm font-medium">
                  Original Payment Mode
                </Label>
                <p className="text-xs text-muted-foreground">
                  Refund to original payment method (card, wallet, etc.)
                </p>
              </div>
              <Switch
                id="enable-original-payment"
                checked={paymentModes.originalPayment}
                onCheckedChange={(checked) => handlePaymentModeChange('originalPayment', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-subtle">
              <div className="space-y-1">
                <Label htmlFor="enable-others" className="text-sm font-medium">
                  Others
                </Label>
                <p className="text-xs text-muted-foreground">
                  Alternative refund methods (crypto, cash, etc.)
                </p>
              </div>
              <Switch
                id="enable-others"
                checked={paymentModes.others}
                onCheckedChange={(checked) => handlePaymentModeChange('others', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Processing Time Configuration */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-primary" />
            Processing Time & SLA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="processing-time">Refund Processing Time</Label>
              <Input
                id="processing-time"
                value={processingTime}
                onChange={(e) => setProcessingTime(e.target.value)}
                placeholder="e.g., 3-5 business days"
              />
              <p className="text-xs text-muted-foreground">
                This message will be shown to customers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sla-guidelines">SLA Guidelines</Label>
              <Textarea
                id="sla-guidelines"
                placeholder="Internal processing guidelines and escalation procedures..."
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automated Processing Rules */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="h-4 w-4 text-primary" />
            Automated Processing Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="auto-refund-limit">Auto-Refund Limit ($)</Label>
              <Input
                id="auto-refund-limit"
                type="number"
                value={autoRefundLimit}
                onChange={(e) => setAutoRefundLimit(e.target.value)}
                placeholder="500"
              />
              <p className="text-xs text-muted-foreground">
                Refunds below this amount are processed automatically
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="manual-approval-threshold">Manual Approval Threshold ($)</Label>
              <Input
                id="manual-approval-threshold"
                type="number"
                value={manualApprovalThreshold}
                onChange={(e) => setManualApprovalThreshold(e.target.value)}
                placeholder="1000"
              />
              <p className="text-xs text-muted-foreground">
                Refunds above this amount require manual approval
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Compliance */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4 text-primary" />
            Security & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch id="pci-compliance" defaultChecked />
                <Label htmlFor="pci-compliance" className="text-sm">PCI DSS Compliance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="fraud-detection" defaultChecked />
                <Label htmlFor="fraud-detection" className="text-sm">Fraud Detection</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="audit-logging" defaultChecked />
                <Label htmlFor="audit-logging" className="text-sm">Audit Logging</Label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch id="encryption" defaultChecked />
                <Label htmlFor="encryption" className="text-sm">End-to-End Encryption</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" defaultChecked />
                <Label htmlFor="two-factor" className="text-sm">Two-Factor Authentication</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="gdpr-compliance" defaultChecked />
                <Label htmlFor="gdpr-compliance" className="text-sm">GDPR Compliance</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button onClick={handleSave} className="bg-success hover:bg-success/90">
          <Save className="h-4 w-4 mr-2" />
          Save Payment Settings
        </Button>
      </div>
    </div>
  );
}