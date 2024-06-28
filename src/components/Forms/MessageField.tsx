// Definition of the types of properties expected by the component
interface Props {
  typeField: string;
  classNameField: string;
  label: string;
  type: string;
  name: string;
  data: string;
  onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

// Defines the component
export default function MessageField({
  typeField,
  classNameField,
  label,
  type,
  name,
  data,
  onChangeInput,
  onChangeTextArea,
  value,
}: Props) {
  return (
    // Section enclosing the form field
    <section className="forms__container-section">
      <label htmlFor={name} className="weight-bold">
        {label}
      </label>
      {/* Conditional rendering of input or textarea based on typeField */}
      {typeField === "textarea" ? (
        <textarea
          name={name}
          className={classNameField}
          data-type={data}
          onChange={onChangeTextArea}
          value={value}
        />
      ) : (
        typeField === "input" && (
          <input
            type={type}
            name={name}
            className={classNameField}
            data-type={data}
            onChange={onChangeInput}
            value={value}
          />
        )
      )}
    </section>
  );
}
