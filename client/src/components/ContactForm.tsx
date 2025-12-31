import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { useServices } from "@/hooks/use-services";
import { useCities } from "@/hooks/use-cities";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";
import { useEffect } from "react";

type FormValues = z.infer<typeof insertInquirySchema>;

interface ContactFormProps {
  defaultService?: string;
  defaultCity?: string;
}

export function ContactForm({ defaultService, defaultCity }: ContactFormProps) {
  const { data: services } = useServices();
  const { data: cities } = useCities();
  const { mutate, isPending } = useCreateInquiry();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      fullName: "",
      phone: "",
      city: defaultCity || "",
      service: defaultService || "",
      areaAddress: "",
      message: "",
      preferredContactMethod: "Call",
    },
  });

  // Update defaults if props change
  useEffect(() => {
    if (defaultService) form.setValue("service", defaultService);
    if (defaultCity) form.setValue("city", defaultCity);
  }, [defaultService, defaultCity, form]);

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Inquiry Submitted!",
          description: "We'll get back to you shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Submission Failed",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="bg-card rounded-2xl shadow-xl shadow-black/5 border border-border p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-display font-bold text-foreground">Get a Free Quote</h3>
        <p className="text-muted-foreground mt-1">Fill out the form and we'll contact you instantly.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ali Khan" {...field} className="h-11 rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="0300 1234567" {...field} className="h-11 rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 rounded-lg">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities?.map((city) => (
                        <SelectItem key={city.id} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Required</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 rounded-lg">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services?.map((service) => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="areaAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area / Address (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. DHA Phase 6, Street 12..." {...field} value={field.value || ''} className="h-11 rounded-lg" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your issue..." 
                    className="min-h-[100px] rounded-lg resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-bold rounded-lg mt-2 bg-gradient-to-r from-primary to-blue-600 hover:to-blue-700 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Submit Inquiry <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
