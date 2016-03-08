I18n.translations || (I18n.translations = {});
I18n.translations["en"] = I18n.extend((I18n.translations["en"] || {}), {"backend":{"authentication":{"email":"E-mail address","headers":{"registration":"Organizer Register"},"login":"Login","logout":"Logout","name":"Name","organizer_name":"Organizer Name","password":"Password","password_confirmation":"Confirm Password","redirect_to_login":"Already have an account?","register":"Register","sign_up":"Sign up"},"events":{"available":"available","create_event":"Create Event","create_new_event":"Create New Event","date":"date","description":"description","header":"Event","headers":{"event":"Event","new_event":"New Event"},"image":"Image","image_upload":{"delete":"Delete","dropzone_title":"Try dropping an image here, or click to select image to upload."},"name":"name","save_changes":"Save Changes","search":"Search events","success_delete":"Successfully delete event."},"modal":{"confirm":{"cancel":"Cancel","delete":"Delete","description":{"delete_event":"Are your sure to delete this event?"},"title":{"delete_event":"Confirm deletion"}}},"navbar":{"brand":"SQUARE","event":"Event"},"tickets":{"cannot_destroy":"purchased ticket can not be destroy","cannot_transition_to":"can't transition to %{state}","edit_ticket":"Edit Ticket","new_ticket":"New Ticket"}},"devise":{"confirmations":{"confirmed":"Your email address has been successfully confirmed.","send_instructions":"You will receive an email with instructions for how to confirm your email address in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes."},"failure":{"already_authenticated":"You are already signed in.","inactive":"Your account is not activated yet.","invalid":"Invalid %{authentication_keys} or password.","last_attempt":"You have one more attempt before your account is locked.","locked":"Your account is locked.","not_found_in_database":"Invalid %{authentication_keys} or password.","timeout":"Your session expired. Please sign in again to continue.","unauthenticated":"You need to sign in or sign up before continuing.","unconfirmed":"You have to confirm your email address before continuing."},"mailer":{"confirmation_instructions":{"subject":"Confirmation instructions"},"password_change":{"subject":"Password Changed"},"reset_password_instructions":{"subject":"Reset password instructions"},"unlock_instructions":{"subject":"Unlock instructions"}},"omniauth_callbacks":{"failure":"Could not authenticate you from %{kind} because \"%{reason}\".","success":"Successfully authenticated from %{kind} account."},"passwords":{"no_token":"You can't access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided.","send_instructions":"You will receive an email with instructions on how to reset your password in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.","updated":"Your password has been changed successfully. You are now signed in.","updated_not_active":"Your password has been changed successfully."},"registrations":{"destroyed":"Bye! Your account has been successfully cancelled. We hope to see you again soon.","signed_up":"Welcome! You have signed up successfully.","signed_up_but_inactive":"You have signed up successfully. However, we could not sign you in because your account is not yet activated.","signed_up_but_locked":"You have signed up successfully. However, we could not sign you in because your account is locked.","signed_up_but_unconfirmed":"A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.","update_needs_confirmation":"You updated your account successfully, but we need to verify your new email address. Please check your email and follow the confirm link to confirm your new email address.","updated":"Your account has been updated successfully."},"sessions":{"already_signed_out":"Signed out successfully.","signed_in":"Signed in successfully.","signed_out":"Signed out successfully."},"unlocks":{"send_instructions":"You will receive an email with instructions for how to unlock your account in a few minutes.","send_paranoid_instructions":"If your account exists, you will receive an email with instructions for how to unlock it in a few minutes.","unlocked":"Your account has been unlocked successfully. Please sign in to continue."}},"doorkeeper":{"applications":{"buttons":{"authorize":"Authorize","cancel":"Cancel","destroy":"Destroy","edit":"Edit","submit":"Submit"},"confirmations":{"destroy":"Are you sure?"},"edit":{"title":"Edit application"},"form":{"error":"Whoops! Check your form for possible errors"},"help":{"native_redirect_uri":"Use %{native_redirect_uri} for local tests","redirect_uri":"Use one line per URI","scopes":"Separate scopes with spaces. Leave blank to use the default scopes."},"index":{"callback_url":"Callback URL","name":"Name","new":"New Application","title":"Your applications"},"new":{"title":"New Application"},"show":{"actions":"Actions","application_id":"Application Id","callback_urls":"Callback urls","scopes":"Scopes","secret":"Secret","title":"Application: %{name}"}},"authorizations":{"buttons":{"authorize":"Authorize","deny":"Deny"},"error":{"title":"An error has occurred"},"new":{"able_to":"This application will be able to","prompt":"Authorize %{client_name} to use your account?","title":"Authorization required"},"show":{"title":"Authorization code"}},"authorized_applications":{"buttons":{"revoke":"Revoke"},"confirmations":{"revoke":"Are you sure?"},"index":{"application":"Application","created_at":"Created At","date_format":"%Y-%m-%d %H:%M:%S","title":"Your authorized applications"}},"errors":{"messages":{"access_denied":"The resource owner or authorization server denied the request.","credential_flow_not_configured":"Resource Owner Password Credentials flow failed due to Doorkeeper.configure.resource_owner_from_credentials being unconfigured.","invalid_client":"Client authentication failed due to unknown client, no client authentication included, or unsupported authentication method.","invalid_grant":"The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.","invalid_redirect_uri":"The redirect uri included is not valid.","invalid_request":"The request is missing a required parameter, includes an unsupported parameter value, or is otherwise malformed.","invalid_resource_owner":"The provided resource owner credentials are not valid, or resource owner cannot be found","invalid_scope":"The requested scope is invalid, unknown, or malformed.","invalid_token":{"expired":"The access token expired","revoked":"The access token was revoked","unknown":"The access token is invalid"},"resource_owner_authenticator_not_configured":"Resource Owner find failed due to Doorkeeper.configure.resource_owner_authenticator being unconfiged.","server_error":"The authorization server encountered an unexpected condition which prevented it from fulfilling the request.","temporarily_unavailable":"The authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server.","unauthorized_client":"The client is not authorized to perform this request using this method.","unsupported_grant_type":"The authorization grant type is not supported by the authorization server.","unsupported_response_type":"The authorization server does not support this response type."}},"flash":{"applications":{"create":{"notice":"Application created."},"destroy":{"notice":"Application deleted."},"update":{"notice":"Application updated."}},"authorized_applications":{"destroy":{"notice":"Application revoked."}}},"layouts":{"admin":{"nav":{"applications":"Applications","oauth2_provider":"OAuth2 Provider"}},"application":{"title":"OAuth authorization required"}}}});
I18n.translations["th"] = I18n.extend((I18n.translations["th"] || {}), {"backend":{"authentication":{"email":"E-mail address","headers":{"registration":"Organizer Register"},"login":"Login","logout":"Logout","name":"Name","organizer_name":"Organizer Name","password":"Password","password_confirmation":"Confirm Password","redirect_to_login":"Already have an account?","register":"Register","sign_up":"Sign up"},"events":{"available":"available","create_event":"Create Event","create_new_event":"Create New Event","date":"date","description":"description","header":"Event","headers":{"event":"Event","new_event":"New Event"},"image":"Image","image_upload":{"delete":"Delete","dropzone_title":"Try dropping an image here, or click to select image to upload."},"name":"name","save_changes":"Save Changes","search":"Search events","success_delete":"Successfully delete event."},"modal":{"confirm":{"cancel":"Cancel","delete":"Delete","description":{"delete_event":"Are your sure to delete this event?"},"title":{"delete_event":"Confirm deletion"}}},"navbar":{"brand":"SQUARE","event":"Event"},"tickets":{"cannot_destroy":"purchased ticket can not be destroy","cannot_transition_to":"can't transition to %{state}","edit_ticket":"Edit Ticket","new_ticket":"New Ticket"}},"devise":{"confirmations":{"confirmed":"Your email address has been successfully confirmed.","send_instructions":"You will receive an email with instructions for how to confirm your email address in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes."},"failure":{"already_authenticated":"You are already signed in.","inactive":"Your account is not activated yet.","invalid":"Invalid %{authentication_keys} or password.","last_attempt":"You have one more attempt before your account is locked.","locked":"Your account is locked.","not_found_in_database":"Invalid %{authentication_keys} or password.","timeout":"Your session expired. Please sign in again to continue.","unauthenticated":"You need to sign in or sign up before continuing.","unconfirmed":"You have to confirm your email address before continuing."},"mailer":{"confirmation_instructions":{"subject":"Confirmation instructions"},"password_change":{"subject":"Password Changed"},"reset_password_instructions":{"subject":"Reset password instructions"},"unlock_instructions":{"subject":"Unlock instructions"}},"omniauth_callbacks":{"failure":"Could not authenticate you from %{kind} because \"%{reason}\".","success":"Successfully authenticated from %{kind} account."},"passwords":{"no_token":"You can't access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided.","send_instructions":"You will receive an email with instructions on how to reset your password in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.","updated":"Your password has been changed successfully. You are now signed in.","updated_not_active":"Your password has been changed successfully."},"registrations":{"destroyed":"Bye! Your account has been successfully cancelled. We hope to see you again soon.","signed_up":"Welcome! You have signed up successfully.","signed_up_but_inactive":"You have signed up successfully. However, we could not sign you in because your account is not yet activated.","signed_up_but_locked":"You have signed up successfully. However, we could not sign you in because your account is locked.","signed_up_but_unconfirmed":"A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.","update_needs_confirmation":"You updated your account successfully, but we need to verify your new email address. Please check your email and follow the confirm link to confirm your new email address.","updated":"Your account has been updated successfully."},"sessions":{"already_signed_out":"Signed out successfully.","signed_in":"Signed in successfully.","signed_out":"Signed out successfully."},"unlocks":{"send_instructions":"You will receive an email with instructions for how to unlock your account in a few minutes.","send_paranoid_instructions":"If your account exists, you will receive an email with instructions for how to unlock it in a few minutes.","unlocked":"Your account has been unlocked successfully. Please sign in to continue."}},"doorkeeper":{"applications":{"buttons":{"authorize":"Authorize","cancel":"Cancel","destroy":"Destroy","edit":"Edit","submit":"Submit"},"confirmations":{"destroy":"Are you sure?"},"edit":{"title":"Edit application"},"form":{"error":"Whoops! Check your form for possible errors"},"help":{"native_redirect_uri":"Use %{native_redirect_uri} for local tests","redirect_uri":"Use one line per URI","scopes":"Separate scopes with spaces. Leave blank to use the default scopes."},"index":{"callback_url":"Callback URL","name":"Name","new":"New Application","title":"Your applications"},"new":{"title":"New Application"},"show":{"actions":"Actions","application_id":"Application Id","callback_urls":"Callback urls","scopes":"Scopes","secret":"Secret","title":"Application: %{name}"}},"authorizations":{"buttons":{"authorize":"Authorize","deny":"Deny"},"error":{"title":"An error has occurred"},"new":{"able_to":"This application will be able to","prompt":"Authorize %{client_name} to use your account?","title":"Authorization required"},"show":{"title":"Authorization code"}},"authorized_applications":{"buttons":{"revoke":"Revoke"},"confirmations":{"revoke":"Are you sure?"},"index":{"application":"Application","created_at":"Created At","date_format":"%Y-%m-%d %H:%M:%S","title":"Your authorized applications"}},"errors":{"messages":{"access_denied":"The resource owner or authorization server denied the request.","credential_flow_not_configured":"Resource Owner Password Credentials flow failed due to Doorkeeper.configure.resource_owner_from_credentials being unconfigured.","invalid_client":"Client authentication failed due to unknown client, no client authentication included, or unsupported authentication method.","invalid_grant":"The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.","invalid_redirect_uri":"The redirect uri included is not valid.","invalid_request":"The request is missing a required parameter, includes an unsupported parameter value, or is otherwise malformed.","invalid_resource_owner":"The provided resource owner credentials are not valid, or resource owner cannot be found","invalid_scope":"The requested scope is invalid, unknown, or malformed.","invalid_token":{"expired":"The access token expired","revoked":"The access token was revoked","unknown":"The access token is invalid"},"resource_owner_authenticator_not_configured":"Resource Owner find failed due to Doorkeeper.configure.resource_owner_authenticator being unconfiged.","server_error":"The authorization server encountered an unexpected condition which prevented it from fulfilling the request.","temporarily_unavailable":"The authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server.","unauthorized_client":"The client is not authorized to perform this request using this method.","unsupported_grant_type":"The authorization grant type is not supported by the authorization server.","unsupported_response_type":"The authorization server does not support this response type."}},"flash":{"applications":{"create":{"notice":"Application created."},"destroy":{"notice":"Application deleted."},"update":{"notice":"Application updated."}},"authorized_applications":{"destroy":{"notice":"Application revoked."}}},"layouts":{"admin":{"nav":{"applications":"Applications","oauth2_provider":"OAuth2 Provider"}},"application":{"title":"OAuth authorization required"}}}});
