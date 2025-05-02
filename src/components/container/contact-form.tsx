import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactComponent() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="h-1 w-6 bg-[#F69429]"></div>
            <span className="text-sm font-medium uppercase tracking-wider text-[#F69429]">
              Liên Hệ
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Liên Hệ Ngay Với
            <br />
            Chúng Tôi
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            Hãy liên hệ với chúng tôi để được giải đáp thắc mắc hoặc hỗ trợ.
            Chúng tôi ở đây để giúp đỡ và mong nhận được phản hồi từ bạn.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                <Phone className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">Tel</h3>
                <p className="text-muted-foreground">+84 (123) 456-789</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                <Mail className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">info@example.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                <MapPin className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">Địa Chỉ</h3>
                <p className="text-muted-foreground">
                  123 Main Street, Level 4<br />
                  Bien Hoa , TP Ho Chi Minh, VietNam
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    id="first-name"
                    placeholder="First Name"
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="last-name"
                    placeholder="Last Name"
                    className="border-gray-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Phone No."
                    className="border-gray-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Textarea
                  id="message"
                  placeholder="Message"
                  className="min-h-[120px] border-gray-300"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
