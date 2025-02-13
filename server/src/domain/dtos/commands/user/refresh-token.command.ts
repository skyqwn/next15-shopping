export type RefreshTokenCommandProps = {
  userId: string;
};

export class RefreshTokenCommand {
  readonly userId: string;

  constructor(props: RefreshTokenCommandProps) {
    this.userId = props.userId;
  }
}
