import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  projectType: z.string().min(1, {
    message: "Please select a project type.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-cream selection:bg-gold selection:text-white">
      <Helmet>
        <title>Contact | Michael Chandler | Luxury Construction</title>
        <meta name="description" content="Get in touch with Michael Chandler for your next custom residence, renovation, or commercial project." />
      </Helmet>
      <Header />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
          {/* Subtle decorative background element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="container mx-auto max-w-7xl px-6 relative z-10">
            <div className="text-center lg:text-left">
              <span className="font-playfair text-7xl lg:text-9xl text-gold/10 font-light leading-none block -mb-4 lg:-mb-6">
                Contact
              </span>
              <p className="font-inter text-xs tracking-[0.4em] text-gold uppercase mb-6 animate-fade-in">
                Get In Touch
              </p>
              <h1 className="font-playfair text-5xl lg:text-6xl text-white mb-8 animate-fade-in delay-100">
                Start Your Journey
              </h1>
              <p className="font-playfair text-white/60 max-w-2xl text-xl lg:text-2xl italic leading-relaxed animate-fade-in delay-200">
                "We build more than just structures; we build lasting legacy relationships."
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

              {/* Contact Information */}
              <div className="space-y-12 animate-fade-in-up">
                <div>
                  <h2 className="text-3xl font-playfair text-charcoal mb-6 border-b border-gold/30 pb-4 inline-block">
                    Contact Information
                  </h2>
                  <p className="text-lg font-inter text-charcoal/70 leading-relaxed mb-8">
                    With over 37 years of experience in construction and design,
                    we're ready to bring your vision to life.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-charcoal/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-500">
                      <Phone className="w-6 h-6 text-charcoal group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-xl mb-1 text-charcoal">
                        Phone
                      </h3>
                      <a
                        href="tel:+14352377373"
                        className="text-charcoal/60 hover:text-gold transition-colors font-inter block text-lg"
                      >
                        +1 (435) 237-7373
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-charcoal/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-500">
                      <Mail className="w-6 h-6 text-charcoal group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-xl mb-1 text-charcoal">
                        Email
                      </h3>
                      <a
                        href="mailto:mike.rcccon@yahoo.com"
                        className="text-charcoal/60 hover:text-gold transition-colors font-inter block text-lg break-all"
                      >
                        mike.rcccon@yahoo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-charcoal/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-500">
                      <MapPin className="w-6 h-6 text-charcoal group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-xl mb-1 text-charcoal">
                        Location
                      </h3>
                      <p className="text-charcoal/60 font-inter text-lg">
                        8215 Winding Hills Ln<br />
                        Spring, Texas 77379
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 shadow-luxury border-l-4 border-gold">
                  <h3 className="font-playfair text-xl mb-4 text-charcoal">
                    Business Hours
                  </h3>
                  <div className="space-y-2 font-inter text-charcoal/70">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Appointment Only</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 sm:p-10 shadow-2xl relative animate-fade-in-up delay-200">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 -mr-4 -mt-4 -z-10 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-charcoal/5 -ml-4 -mb-4 -z-10 rounded-bl-3xl" />

                {isSubmitted ? (
                  <div className="text-center py-16">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-600">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-playfair mb-4 text-charcoal">
                      Thank You!
                    </h3>
                    <p className="text-charcoal/60 font-inter mb-8 text-lg">
                      Your message has been sent successfully. We'll be in touch soon.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-charcoal hover:bg-gold text-white transition-colors duration-300 px-8 py-6"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-playfair mb-2 text-charcoal">
                      Send Us a Message
                    </h2>
                    <p className="text-charcoal/50 mb-8 font-inter">We'd love to hear about your project.</p>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-charcoal/80">Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} className="h-12 border-charcoal/10 focus:border-gold focus:ring-gold/20 bg-cream/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-charcoal/80">Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} className="h-12 border-charcoal/10 focus:border-gold focus:ring-gold/20 bg-cream/50" />
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
                              <FormLabel className="text-charcoal/80">Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="(555) 123-4567" {...field} className="h-12 border-charcoal/10 focus:border-gold focus:ring-gold/20 bg-cream/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="projectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-charcoal/80">Project Type *</FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className="w-full px-3 py-3 border border-charcoal/10 bg-cream/50 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold h-12"
                                >
                                  <option value="">Select a project type</option>
                                  <option value="residential-construction">Residential Construction</option>
                                  <option value="residential-development">Residential Development</option>
                                  <option value="design-build">Design/Build</option>
                                  <option value="hospitality">Hospitality</option>
                                  <option value="civil">Civil</option>
                                  <option value="renovation">Renovation</option>
                                  <option value="consultation">Consultation</option>
                                  <option value="other">Other</option>
                                </select>
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
                              <FormLabel className="text-charcoal/80">Message *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your project..."
                                  className="min-h-[150px] resize-none border-charcoal/10 focus:border-gold focus:ring-gold/20 bg-cream/50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full bg-charcoal hover:bg-gold text-white font-inter py-7 text-lg tracking-wide transition-all duration-300 shadow-lg hover:shadow-gold/20 mt-4"
                          disabled={form.formState.isSubmitting}
                        >
                          {form.formState.isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-3" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
