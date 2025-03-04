import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvitationActions } from "./invitation-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPendingInvitations } from "@/utils/queries/auth";

interface InvitationsDialogProps {
  userEmail: string;
}

export async function InvitationsDialog({ userEmail }: InvitationsDialogProps) {
  const invitationsList = await getPendingInvitations(userEmail);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Invitations
          {invitationsList.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {invitationsList.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Pending Invitations</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitationsList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No pending invitations
                  </TableCell>
                </TableRow>
              ) : (
                invitationsList.map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell>
                      {invitation.organizationName || "Unknown Organization"}
                    </TableCell>
                    <TableCell>{invitation.role || "N/A"}</TableCell>
                    <TableCell>
                      {new Date(invitation.expiresAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <InvitationActions invitationId={invitation.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
