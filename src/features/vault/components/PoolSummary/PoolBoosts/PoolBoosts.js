import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { launchpools } from '../../../../helpers/getNetworkData';
import { shallowEqual, useSelector } from 'react-redux';
import { byDecimals } from '../../../../helpers/bignumber';
import { useLaunchpoolSubscriptions } from '../../../../stake/redux/hooks';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { formatDecimals } from '../../../../helpers/format';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(styles);

const StyledTableCell = withStyles(theme => ({
  root: {
    padding: '16px 24px',
  },
  head: {
    fontWeight: 'bold',
  },
}))(TableCell);

export const PoolBoosts = function ({ poolName, earnedTokenAddress }) {
  const { chain } = useParams();
  const classes = useStyles();
  const { t } = useTranslation();
  const { subscribe } = useLaunchpoolSubscriptions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fullscreenDialog = useMediaQuery(theme => theme.breakpoints.down('xs'));

  // Find launchpools that ended less than 30 days ago
  const recentLaunchpools = useMemo(() => {
    const nowMinusDays = Date.now() / 1000 - 86400 * 30;
    return Object.values(launchpools).filter(
      lp => lp.tokenAddress === earnedTokenAddress && lp.periodFinish > nowMinusDays
    );
  }, [earnedTokenAddress]);

  // Subscribe to user staked for those pools
  useEffect(() => {
    const unsubscribes = recentLaunchpools.map(launchpool =>
      subscribe(launchpool.id, {
        userStaked: true,
      })
    );

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [subscribe, recentLaunchpools]);

  // Get user staked for those pools (if not zero)
  const recentStaked = useSelector(
    state =>
      Object.fromEntries(
        recentLaunchpools
          .map(lp => [
            lp.id,
            state.stake.userStaked[lp.id] && state.stake.userStaked[lp.id] !== '0'
              ? byDecimals(state.stake.userStaked[lp.id], lp.tokenDecimals)
              : null,
          ])
          .filter(([, staked]) => !!staked)
      ),
    shallowEqual
  );

  // Toggle dialog
  const handleDialogOpen = useCallback(() => setIsDialogOpen(true), [setIsDialogOpen]);
  const handleDialogClose = useCallback(() => setIsDialogOpen(false), [setIsDialogOpen]);

  // Count
  const numStakedLaunchpools = Object.keys(recentStaked).length;

  if (!numStakedLaunchpools) {
    return null;
  }

  if (numStakedLaunchpools === 1) {
    const launchpool = launchpools[Object.keys(recentStaked)[0]];
    return (
      <Link to={`/${chain}/stake/pool/${launchpool.id}`} className={classes.boosts}>
        {t('Vault-Boosts-Staked-Single', { name: launchpool.name })}
      </Link>
    );
  }

  return (
    <>
      <div className={classes.boosts} onClick={handleDialogOpen}>
        {t('Vault-Boosts-Staked-Count', { count: numStakedLaunchpools })}
      </div>
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        fullScreen={fullscreenDialog}
        fullWidth={true}
      >
        <DialogTitle>
          {poolName} - {t('Boosts')}
        </DialogTitle>
        <DialogContent dividers classes={{ root: classes.dialogContent }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>{t('Boost')}</StyledTableCell>
                <StyledTableCell align="right">
                  {t('Stake-Balancer-Current-Staked')}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(recentStaked).map(([id, userStaked]) => (
                <TableRow key={id}>
                  <StyledTableCell>
                    <Link to={`/${chain}/stake/pool/${id}`} className={classes.link}>
                      {launchpools[id].name}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {formatDecimals(userStaked)} {launchpools[id].token}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
