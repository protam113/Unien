'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { CreateContactItem } from '@/types/types';
import { useCreateContact } from '@/hooks/contact/useContact';
import { logDebug } from '@/utils/logger';
import { toast } from 'sonner';
import contactInfo from '@/data/contact.data.json';
import appInfo from '@/data/app.data.json';
import { SectionHeader } from './SectionHeader';

export function ContactComponent() {
  const [loading, setLoading] = useState(false);

  const [contactData, setContactData] = useState<CreateContactItem>({
    name: '',
    email: '',
    phone_number: '',
    message: '',
  });

  const { mutate: createContact } = useCreateContact();

  const handleSentContact = async () => {
    logDebug('Final Product Data:', contactData);
    setLoading(true);
    try {
      if (contactData.name.trim() === '') {
        toast.error('Name is required');
        setLoading(false);
        return;
      }

      if (contactData.email.trim() === '') {
        toast.error('Email is required');
        setLoading(false);
        return;
      }

      if (contactData.message.trim() === '') {
        toast.error('Message is required');
        setLoading(false);
        return;
      }

      const productDataToSend: CreateContactItem = {
        ...contactData,
      };

      createContact(productDataToSend);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Reset state mà không gây re-render liên tục
      setContactData({
        name: '',
        email: '',
        phone_number: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Error sent contact.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 mb-8">
          <SectionHeader title={contactInfo.ContactData.title} />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {contactInfo.ContactData.content}
            <br />
            Chúng Tôi
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            {contactInfo.ContactData.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                <Phone className="h-5 w-5 text-main" />
              </div>
              <div>
                <h3 className="font-semibold">Tel</h3>
                <p className="text-muted-foreground">+84 (123) 456-789</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                <Mail className="h-5 w-5 text-main" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">info@example.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                <MapPin className="h-5 w-5 text-main" />
              </div>
              <div>
                <h3 className="font-semibold">Địa Chỉ</h3>
                <p className="text-muted-foreground">
                  {appInfo.AppData.address}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form className="grid gap-4">
              <div className="space-y-2">
                <Input
                  id="Name"
                  placeholder="Tên"
                  value={contactData.name}
                  onChange={(e) =>
                    setContactData((prevData) => ({
                      ...prevData,
                      name: e.target.value,
                    }))
                  }
                  required
                  className="border-gray-300"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="unien@unien.com"
                    value={contactData.email}
                    onChange={(e) =>
                      setContactData((prevData) => ({
                        ...prevData,
                        email: e.target.value,
                      }))
                    }
                    required
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="(+00)000000"
                    value={contactData.phone_number}
                    onChange={(e) =>
                      setContactData((prevData) => ({
                        ...prevData,
                        phone_number: e.target.value,
                      }))
                    }
                    className="border-gray-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Textarea
                  id="message"
                  placeholder="Message"
                  value={contactData.message}
                  onChange={(e) =>
                    setContactData((prevData) => ({
                      ...prevData,
                      message: e.target.value,
                    }))
                  }
                  className="min-h-[120px] border-gray-300"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                onClick={handleSentContact}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              >
                {loading ? 'Đang Gửi...' : 'Gửi'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
