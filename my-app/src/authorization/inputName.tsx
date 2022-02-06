export interface NameInput {
  name: string
  setName: any
}

const NameInput = ({ name, setName }: NameInput) => {
  return (
    <div>
      <label className='auth-form__label' htmlFor='name'>Name:</label>
      <input 
        className='auth-form__input' 
        type='name'
        required 
        placeholder='User name'
        id='name' 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  )
}

export default NameInput;