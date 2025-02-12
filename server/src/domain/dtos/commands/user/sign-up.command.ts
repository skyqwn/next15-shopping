export type SignUpCommandProps = {
  email: string;
  password: string;
  name: string;
};

export class SignUpCommand {
  readonly email: string;
  readonly password: string;
  readonly name: string;

  constructor(props: SignUpCommandProps) {
    this.email = props.email;
    this.password = props.password;
    this.name = props.name;
  }
}
