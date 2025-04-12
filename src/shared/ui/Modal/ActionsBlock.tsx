type ActionsBlockProps = {
    
} 
export const ActionsBlock = ({}) => (
  <div
    className={`flex  ${positions[actionOptions.position ?? DEFAULTS.position!]} `}
  >
    <ButtonBase
      style={{ width: "100%" }}
      variant={actionOptions.cancelBtn?.clrVariant ?? "secondary"}
      text={actionOptions.cancelBtn?.text ?? "Cancel"}
      onClick={setClose}
    />
    {action && (
      <ButtonBase
        style={{ width: "100%" }}
        variant={actionOptions.confirmBtn?.clrVariant ?? "primary"}
        text={actionOptions.confirmBtn?.text ?? "confirm"}
        {...actionOptions.confirmBtn?.confirmOptions}
        onClick={async () => {
          if (!action) return;
          action();
          setClose();
        }}
      />
    )}
  </div>
);
