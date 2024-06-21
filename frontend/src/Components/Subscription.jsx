import { Link } from 'react-router-dom';

function Subscription() {
  const plans = [
    {
      name: 'Free',
      price: '$0/month',
      features: [
        'Basic features',
        'Limited support',
        'Access to community forum'
      ]
    },
    {
      name: 'Plus',
      price: '$10/month',
      features: [
        'All Free features',
        'Priority support',
        'Access to beta features'
      ]
    },
    {
      name: 'Team',
      price: '$50/month',
      features: [
        'All Plus features',
        'Team collaboration tools',
        'Dedicated account manager'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-12">Subscription Plans</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan, index) => (
          <div key={index} className="bg-[#D9D9D9] p-8 rounded-xl shadow-lg max-w-sm">
            <h2 className="text-2xl text-[#424242] font-semibold mb-4">{plan.name}</h2>
            <div className="border-t border-gray-400 flex-grow"></div>
            <div className="border-t border-gray-400 flex-grow"></div>
            <p className="text-xl text-[#424242] mt-4 mb-6">{plan.price}</p>
            <ul className="mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-2 text-[#424242]">- {feature}</li>
              ))}
            </ul>
            <button className="w-full py-2 bg-[#424242] rounded-lg text-white font-medium">
              Select Plan
            </button>
          </div>
        ))}
      </div>
      <Link to="/">
      <button className='bg-[#D9D9D9] p-2 text-[#424242] font-semibold mt-10 rounded-xl'>Get Back to GPT</button>
      </Link>
    </div>
  );
}

export default Subscription;
