import classes from './Card.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<Props> = props => {
  return (
    <section
      className={`${classes.card} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </section>
  )
}

export default Card
