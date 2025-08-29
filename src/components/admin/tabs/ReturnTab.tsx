import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Calendar, MapPin, CreditCard, Package, Camera, FileText, TestTube } from 'lucide-react';

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

interface ReturnTabProps {
  settings: AdminSettings;
}

export function ReturnTab({ settings }: ReturnTabProps) {
  const [testMode, setTestMode] = useState(false);
  const [returnDays, setReturnDays] = useState('30');
  const [multipleReturns, setMultipleReturns] = useState(true);
  const [selectedStates, setSelectedStates] = useState<string[]>(['CA', 'NY', 'TX']);
  const [refundModes, setRefundModes] = useState({
    storeCredit: true,
    bankTransfer: true,
    originalPayment: true,
    others: false
  });
  const [returnMethods, setReturnMethods] = useState('label');
  const [reasonRules, setReasonRules] = useState({
    requirePhoto: true,
    requireNote: true,
    mandatoryOptIn: false
  });

  if (!settings.enableReturns) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <RotateCcw className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Returns Not Enabled</h3>
        <p className="text-muted-foreground mb-4">Enable returns in the Settings tab to configure return options.</p>
        <Badge variant="outline">Disabled</Badge>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Test Mode Toggle */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-primary-subtle">
        <div className="flex items-center gap-2">
          <TestTube className="h-4 w-4 text-primary" />
          <Label htmlFor="test-mode" className="text-sm font-medium">Test Mode</Label>
          <Badge variant="secondary" className="text-xs">Simulate return logic</Badge>
        </div>
        <Switch
          id="test-mode"
          checked={testMode}
          onCheckedChange={setTestMode}
        />
      </div>

      {/* Eligibility Rules */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4 text-primary" />
            Eligibility Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="return-days">Number of returnable days</Label>
              <Input
                id="return-days"
                type="number"
                value={returnDays}
                onChange={(e) => setReturnDays(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Orders between dates</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" placeholder="Start date" />
                <Input type="date" placeholder="End date" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="multiple-returns"
              checked={multipleReturns}
              onCheckedChange={(checked) => setMultipleReturns(checked === true)}
            />
            <Label htmlFor="multiple-returns" className="text-sm">Allow multiple item returns</Label>
          </div>
        </CardContent>
      </Card>

      {/* Product Filters */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4 text-primary" />
            Product Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Product Tag</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Discount Code</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select discount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer20">SUMMER20</SelectItem>
                  <SelectItem value="welcome10">WELCOME10</SelectItem>
                  <SelectItem value="loyalty15">LOYALTY15</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Product Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical Product</SelectItem>
                  <SelectItem value="digital">Digital Product</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Vendor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="globex">Globex Industries</SelectItem>
                  <SelectItem value="initech">Initech</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Collection</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">Summer Collection</SelectItem>
                  <SelectItem value="winter">Winter Collection</SelectItem>
                  <SelectItem value="limited">Limited Edition</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location Filter (State-wise)
            </Label>
            <div className="flex flex-wrap gap-2">
              {['CA', 'NY', 'TX', 'FL', 'IL', 'WA', 'PA', 'OH'].map((state) => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox
                    id={`state-${state}`}
                    checked={selectedStates.includes(state)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStates(prev => [...prev, state]);
                      } else {
                        setSelectedStates(prev => prev.filter(s => s !== state));
                      }
                    }}
                  />
                  <Label htmlFor={`state-${state}`} className="text-sm">{state}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refund Modes */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4 text-primary" />
            Refund Modes (Prepaid Orders)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="store-credit"
                checked={refundModes.storeCredit}
                onCheckedChange={(checked) => setRefundModes(prev => ({ ...prev, storeCredit: checked as boolean }))}
              />
              <Label htmlFor="store-credit">Store Credit (via Discount Code or Gift Card)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bank-transfer"
                checked={refundModes.bankTransfer}
                onCheckedChange={(checked) => setRefundModes(prev => ({ ...prev, bankTransfer: checked as boolean }))}
              />
              <Label htmlFor="bank-transfer">Bank Transfer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="original-payment"
                checked={refundModes.originalPayment}
                onCheckedChange={(checked) => setRefundModes(prev => ({ ...prev, originalPayment: checked as boolean }))}
              />
              <Label htmlFor="original-payment">Original Payment Mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="others"
                checked={refundModes.others}
                onCheckedChange={(checked) => setRefundModes(prev => ({ ...prev, others: checked as boolean }))}
              />
              <Label htmlFor="others">Others</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Return Methods */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4 text-primary" />
            Return Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={returnMethods} onValueChange={setReturnMethods}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="label" id="return-label" />
              <Label htmlFor="return-label">Send Return Label</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="self-ship" id="self-ship" />
              <Label htmlFor="self-ship">Ship Back Myself</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="store-return" id="store-return" />
              <Label htmlFor="store-return">Return at Store</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Return Reason Rules */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" />
            Return Reason Rules (Example: "Other")
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="require-photo"
                checked={reasonRules.requirePhoto}
                onCheckedChange={(checked) => setReasonRules(prev => ({ ...prev, requirePhoto: checked as boolean }))}
              />
              <Label htmlFor="require-photo" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Require Photo/Video
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="require-note"
                checked={reasonRules.requireNote}
                onCheckedChange={(checked) => setReasonRules(prev => ({ ...prev, requireNote: checked as boolean }))}
              />
              <Label htmlFor="require-note">Require Note Description</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mandatory-opt-in"
                checked={reasonRules.mandatoryOptIn}
                onCheckedChange={(checked) => setReasonRules(prev => ({ ...prev, mandatoryOptIn: checked as boolean }))}
              />
              <Label htmlFor="mandatory-opt-in">Mandatory Opt-in</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="custom-text">Custom Text</Label>
            <Textarea
              id="custom-text"
              placeholder="Please enter reason description."
              className="resize-none"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {testMode && (
        <Card className="border-info bg-info-subtle">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-info">
              <TestTube className="h-4 w-4" />
              <span className="font-medium">Test Mode Active</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Return logic simulation is enabled. Customer flows will use these test configurations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}