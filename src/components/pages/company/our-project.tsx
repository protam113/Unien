import SectionHeader from '@/components/container/SectionHeader';
import Image from 'next/image';

export default function OurProjects() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <SectionHeader title="Các Dự Án Đã Thực Hiện" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Santo Domingo Office */}
        <div className="rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="aspect-[16/9] relative w-full">
            <Image
              src="/img/boiler.jpg"
              alt="Santo Domingo Office"
              fill
              className="object-cover rounded-t-3xl"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-3">Santo Domingo, DR</h3>
            <p className="text-gray-600 mb-6">
              Located in the vibrant heart of Santo Domingo, our office provides
              a dynamic workspace that reflects the energy and creativity of the
              Dominican Republic. With modern amenities and a collaborative
              environment, it&apos;s the perfect hub for entrepreneurs and
              businesses looking to thrive in a bustling market.
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>23 Creativity Street, Santo Domingo, 10101</p>
              <p>Dominican Republic</p>
              <p className="hover:underline cursor-pointer">
                santo.domingo@nirastate.com
              </p>
              <p>+1 (809) 555-0123</p>
            </div>
          </div>
        </div>

        {/* New York Office */}
        <div className="rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="aspect-[16/9] relative w-full">
            <Image
              src="/img/boiler.jpg"
              alt="New York Office"
              fill
              className="object-cover rounded-t-3xl"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-3">New York, USA</h3>
            <p className="text-gray-600 mb-6">
              Our US office, situated in a strategic location, offers a
              professional and innovative space designed to support a diverse
              range of businesses. Equipped with the latest technology and
              resources, this location fosters collaboration and growth, making
              it ideal for companies seeking to expand their reach in the North
              American market.
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>456 Innovation Drive, Suite 101,</p>
              <p>Springfield, IL 62701</p>
              <p className="hover:underline cursor-pointer">
                us.office@nirastate.com
              </p>
              <p>+1 (217) 555-0187</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
