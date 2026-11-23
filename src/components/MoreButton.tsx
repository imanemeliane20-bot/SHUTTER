import { MoreVertical } from 'lucide-react'

type MoreButtonProps ={
    onClick: ()=> void;
};

const MoreButton = ({onClick }:MoreButtonProps ) => {
  return (
 <button
 type='button'
 aria-label='More options'
onClick={onClick}
>
 <span className="text-text/60 cursor-pointer hover:text-text">
    <MoreVertical size={19} />
</span>
</button>
  )
}

export default MoreButton;