interface SubmitButtonProps {
  isSubmitting: boolean;
  label: string;
  loadingLabel: string;
}

export default function ButtonSubmit({
  isSubmitting,
  label,
  loadingLabel,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-black text-white w-full text-sm rounded-md py-2 hover:bg-black/85 transition"
    >
      {isSubmitting ? loadingLabel : label}
    </button>
  );
}
