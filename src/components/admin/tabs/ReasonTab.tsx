import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, Plus, Edit, Copy, Trash2, Camera, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Reason {
  id: string;
  name: string;
  message: string;
  requireNote: boolean;
  requireMedia: boolean;
  optInRequired: boolean;
}

export function ReasonTab() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingReason, setEditingReason] = useState<Reason | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    requireNote: false,
    requireMedia: false,
    optInRequired: false
  });

  const [reasons, setReasons] = useState<Reason[]>([
    {
      id: '1',
      name: 'Defective Item',
      message: 'Item received was damaged or not working properly',
      requireNote: true,
      requireMedia: true,
      optInRequired: false
    },
    {
      id: '2',
      name: 'Wrong Size',
      message: 'Item size does not fit as expected',
      requireNote: false,
      requireMedia: false,
      optInRequired: false
    },
    {
      id: '3',
      name: 'Not as Described',
      message: 'Item does not match the product description',
      requireNote: true,
      requireMedia: true,
      optInRequired: true
    },
    {
      id: '4',
      name: 'Changed Mind',
      message: 'Customer no longer wants the item',
      requireNote: false,
      requireMedia: false,
      optInRequired: false
    },
    {
      id: '5',
      name: 'Better Price Found',
      message: 'Customer found the same item at a better price elsewhere',
      requireNote: true,
      requireMedia: false,
      optInRequired: true
    },
    {
      id: '6',
      name: 'Other',
      message: 'Please provide detailed reason for return/exchange',
      requireNote: true,
      requireMedia: true,
      optInRequired: false
    }
  ]);

  const resetForm = () => {
    setFormData({
      name: '',
      message: '',
      requireNote: false,
      requireMedia: false,
      optInRequired: false
    });
    setEditingReason(null);
  };

  const handleCreate = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Reason Name is required.",
        variant: "destructive",
      });
      return;
    }

    const newReason: Reason = {
      id: Date.now().toString(),
      ...formData
    };

    setReasons(prev => [...prev, newReason]);
    setIsCreateDialogOpen(false);
    resetForm();
    
    toast({
      title: "Reason created successfully",
      description: `"${formData.name}" has been added to your reason list.`,
      variant: "default",
    });
  };

  const handleEdit = (reason: Reason) => {
    setEditingReason(reason);
    setFormData({
      name: reason.name,
      message: reason.message,
      requireNote: reason.requireNote,
      requireMedia: reason.requireMedia,
      optInRequired: reason.optInRequired
    });
    setIsCreateDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Reason Name is required.",
        variant: "destructive",
      });
      return;
    }

    if (editingReason) {
      setReasons(prev => prev.map(reason => 
        reason.id === editingReason.id 
          ? { ...reason, ...formData }
          : reason
      ));
      
      setIsCreateDialogOpen(false);
      resetForm();
      
      toast({
        title: "Reason updated successfully",
        description: `"${formData.name}" has been updated.`,
        variant: "default",
      });
    }
  };

  const handleDuplicate = (reason: Reason) => {
    const duplicatedReason: Reason = {
      id: Date.now().toString(),
      name: `${reason.name} (Copy)`,
      message: reason.message,
      requireNote: reason.requireNote,
      requireMedia: reason.requireMedia,
      optInRequired: reason.optInRequired
    };

    setReasons(prev => [...prev, duplicatedReason]);
    
    toast({
      title: "Reason duplicated",
      description: `"${duplicatedReason.name}" has been created.`,
      variant: "default",
    });
  };

  const handleDelete = (reasonId: string) => {
    const reason = reasons.find(r => r.id === reasonId);
    setReasons(prev => prev.filter(r => r.id !== reasonId));
    
    toast({
      title: "Reason deleted",
      description: `"${reason?.name}" has been removed.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Return & Exchange Reasons
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage customer-facing reasons for returns and exchanges
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
          setIsCreateDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-success hover:bg-success/90">
              <Plus className="h-4 w-4 mr-2" />
              Create New Reason
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingReason ? 'Edit Reason' : 'Create New Reason'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="reason-name">Reason Name *</Label>
                <Input
                  id="reason-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Defective Item"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason-message">Custom Message</Label>
                <Textarea
                  id="reason-message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter customer-facing message for this reason"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="require-note">Require Note</Label>
                    <p className="text-xs text-muted-foreground">
                      Customer must provide additional details
                    </p>
                  </div>
                  <Switch
                    id="require-note"
                    checked={formData.requireNote}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, requireNote: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="require-media">Require Media</Label>
                    <p className="text-xs text-muted-foreground">
                      Customer must upload photos or videos
                    </p>
                  </div>
                  <Switch
                    id="require-media"
                    checked={formData.requireMedia}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, requireMedia: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="opt-in-required">Opt-in Required</Label>
                    <p className="text-xs text-muted-foreground">
                      Customer must explicitly agree to terms
                    </p>
                  </div>
                  <Switch
                    id="opt-in-required"
                    checked={formData.optInRequired}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, optInRequired: checked }))}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingReason ? handleUpdate : handleCreate}>
                  {editingReason ? 'Update Reason' : 'Create Reason'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reasons Table */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Configured Reasons ({reasons.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="w-[200px]">Reason Name</TableHead>
                  <TableHead className="w-[300px]">Message</TableHead>
                  <TableHead className="w-[100px] text-center">Require Note</TableHead>
                  <TableHead className="w-[100px] text-center">Require Media</TableHead>
                  <TableHead className="w-[100px] text-center">Opt-in Required</TableHead>
                  <TableHead className="w-[150px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reasons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <MessageSquare className="h-8 w-8 mb-2" />
                        <p>No reasons created yet.</p>
                        <p className="text-sm">Click "Create New Reason" to get started.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  reasons.map((reason) => (
                    <TableRow key={reason.id} className="border-border">
                      <TableCell className="font-medium">{reason.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[300px] truncate">
                        {reason.message || 'No custom message'}
                      </TableCell>
                      <TableCell className="text-center">
                        {reason.requireNote ? (
                          <Badge variant="default" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {reason.requireMedia ? (
                          <Badge variant="default" className="text-xs">
                            <Camera className="h-3 w-3 mr-1" />
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {reason.optInRequired ? (
                          <Badge variant="default" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">No</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(reason)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDuplicate(reason)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(reason.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}