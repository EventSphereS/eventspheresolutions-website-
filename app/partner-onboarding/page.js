import PartnerOnboardingForm from '@/components/PartnerOnboardingForm'

export const metadata = {
  title: 'Partner Onboarding | Sphere',
  description: 'Share your venue details so we can migrate you onto Sphere.',
}

export default function PartnerOnboardingPage() {
  return (
    <section className="pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-[#222123] mb-4">
          Let's get your venue set up on Sphere
        </h1>
        <p className="text-gray-500 leading-relaxed">
          This should take about 10 minutes. Share your venue details, branding, and existing data below, and our team will handle the full migration — your account will be live within 2 business days.
        </p>
      </div>
      <PartnerOnboardingForm />
    </section>
  )
}
