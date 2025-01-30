import { type LucideProps } from 'lucide-react';

interface ICurrencyCard {
  icon: (props: LucideProps) => JSX.Element;
  name: string;
  callBack: () => void;
}

const CurrencyCard = (props: ICurrencyCard) => {
  const { icon: Icon, name, callBack } = props;

  const handlerClick = () => {
    callBack();
  };
  return (
    <button
      className="p-2 flex h-28 items-center justify-center hover:bg-primary flex-col border border-border hover:border-primary w-full max-w-[200px] rounded-xl group duration-300 transition-all"
      onClick={handlerClick}
    >
      <Icon className="h-12 w-12 group-hover:text-white duration-300 transition-all" />
      <span className="text-lg font-reg group-hover:text-white duration-300 transition-all">
        {name}
      </span>
    </button>
  );
};

export default CurrencyCard;
