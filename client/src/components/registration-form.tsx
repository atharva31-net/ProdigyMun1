import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertRegistrationSchema, type InsertRegistration } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { NotebookPen, Flag, Globe } from "lucide-react";
import { COMMITTEES, GRADES, DIVISIONS } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RegistrationForm() {
  const { toast } = useToast();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const form = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      studentName: "",
      email: "",
      committee: "",
      suggestions: "",
    } as InsertRegistration,
  });

  const registrationMutation = useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const res = await apiRequest("POST", "/api/registrations", data);
      return res.json();
    },
    onSuccess: () => {
      setShowSuccessModal(true);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertRegistration) => {
    registrationMutation.mutate(data);
  };

  return (
    <>
      <Card className="surface rounded-2xl shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Register as Delegate</h2>
            <p className="text-gray-600">Join Prodigy MUN 2025 and represent your committee with distinction</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Full Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Grade Selection */}
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Grade <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Grade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {GRADES.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}th Grade
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Division Selection */}
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Division <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DIVISIONS.map((division) => (
                            <SelectItem key={division} value={division}>
                              Division {division}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email Address <span className="text-gray-400">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Committee Selection */}
              <FormField
                control={form.control}
                name="committee"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>
                      Select Committee <span className="text-destructive">*</span>
                    </FormLabel>
                    <p className="text-sm text-gray-500">Choose one committee that interests you most</p>
                    
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-4"
                      >
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-gray-800 border-b border-primary pb-2 flex items-center">
                            <NotebookPen className="mr-2 h-5 w-5 text-primary" />
                            Available Committees
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {COMMITTEES.map((committee) => (
                              <Label
                                key={committee.id}
                                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                              >
                                <RadioGroupItem value={committee.id} className="text-primary" />
                                <span className="ml-3 text-sm font-medium text-gray-700">
                                  {committee.name}
                                </span>
                              </Label>
                            ))}
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Suggestions Field */}
              <FormField
                control={form.control}
                name="suggestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Suggestions or Comments <span className="text-gray-400">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share any suggestions, dietary requirements, or special accommodations needed..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={registrationMutation.isPending}
                  className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8"
                >
                  <NotebookPen className="mr-2 h-4 w-4" />
                  {registrationMutation.isPending ? "Registering..." : "Register for MUN"}
                </Button>
              </div>
            </form>
          </Form>

          {/* Success Modal */}
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <NotebookPen className="h-6 w-6 text-green-600" />
                </div>
                <DialogTitle className="text-center">Registration Successful!</DialogTitle>
                <DialogDescription className="text-center">
                  Your registration has been submitted successfully. You will receive a confirmation email shortly.
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Close
              </Button>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  );
}
