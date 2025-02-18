export type UpdateProfileProps = {
  name: string;
  profileImageUris?: string;
  description?: string;
};

export class UpdateProfileCommand {
  readonly name: string;
  readonly profileImageUris?: string | undefined;
  readonly description?: string | undefined;

  constructor(props: UpdateProfileProps) {
    this.name = props.name;
    this.profileImageUris = props.profileImageUris;
    this.description = props.description;
  }
}
